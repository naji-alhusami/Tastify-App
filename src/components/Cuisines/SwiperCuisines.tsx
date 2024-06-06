import { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperType from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
// import { ITEMS_CATEGORIES } from "./ItemsCategories";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StateContext from "../../store/context/state-context";
import useMealManager from "../../utils/hooks/useMealManager";
import Meals from "./Meals";
// import "./swiper.d.ts";

// interface SwiperCuisinesProps {
//   loopFillGroupWithBlank?: boolean;
// }

const SwiperCuisines = () => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const {
    allMealsData,
    // allMealsPending, allMealsIsError, allMealsError
  } = useMealManager();
  const contextValue = useContext(StateContext);

  if (!contextValue) {
    // We should handle the case when contextValue is null
    return null; // or any other fallback logic
  }
  // const { isCuisine,
  //   // setIsCuisine, setShowRestaurants
  //  } = contextValue;

  // const restaurantsHandler = (cuisine: string) => {
  //   // console.log(cuisine);
  //   setIsCuisine(cuisine);
  //   setShowRestaurants(true);
  // };

  const activeStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-20 place-items-center rounded-full border-2 bg-rose-500 border-rose-500";

  return (
    <div className="relative  overflow-hidden rounded-xl ">
      <div className="absolute inset-0  opacity-100 transition ">
        <button
          onClick={(e) => {
            e.preventDefault();
            swiper?.slideNext();
          }}
          className={`${activeStyles} right-3 transition`}
          aria-label="next image"
        >
          <ChevronRight className="h-4 w-4 text-white" />{" "}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            swiper?.slidePrev();
          }}
          className={`${activeStyles} left-3 transition`}
          aria-label="previous image"
        >
          <ChevronLeft className="h-4 w-4 text-white" />{" "}
        </button>
      </div>

      <Swiper
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={5}
        loop={true}
        // loopFillGroupWithBlank={true}
        modules={[Pagination]}
        className="h-full w-full flex justify-center items-center"
        breakpoints={{
          375: {
            slidesPerView: 1,
          },
          // 640: {
          //   slidesPerView: 2,
          // },
          850: {
            slidesPerView: 2,
          },
          // 1024: {
          //   slidesPerView: 3,
          // },
          1200: {
            slidesPerView: 3,
          },
        }}
      >
        {allMealsData?.map((meal, i) => (
          <SwiperSlide
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            key={i}
            className="relative h-full mx-auto"
          >
            <div key={meal.id}>
              <Meals {...meal} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperCuisines;
