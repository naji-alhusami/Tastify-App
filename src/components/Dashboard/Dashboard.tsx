import { useParams } from "react-router-dom";
import { FetchError } from "../../lib/http/error";
import Meals from "../Cuisines/Meals";
import useMealManager from "../../utils/hooks/useMealManager";
import Loading from "../ui/Loading";
import { useContext, useEffect, useState } from "react";
import StateContext from "../../store/context/state-context";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperType from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [swiper, setSwiper] = useState<null | SwiperType>(null);

  const params = useParams();
  // console.log(params.restaurant);
  const contextValue = useContext(StateContext) as {
    setIsAddMealForm: (form: boolean) => void;
    setIsRestaurant: (restaurant: string) => void;
  };
  const { setIsAddMealForm, setIsRestaurant } = contextValue;

  useEffect(() => {
    if (params.restaurant) {
      setIsRestaurant(params.restaurant);
    }
  }, [params.restaurant, setIsRestaurant]);

  const {
    allRestaurantMealsData,
    allRestaurantMealsPending,
    allRestaurantMealsIsError,
    allRestaurantMealsError,
  } = useMealManager();

  const activeStyles =
    "active:scale-[0.97] md:mx-6 grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-20 place-items-center rounded-full border-2 bg-rose-500 border-rose-500";

  let content;
  if (allRestaurantMealsPending) {
    content = <Loading />;
  } else if (allRestaurantMealsIsError) {
    if (allRestaurantMealsError instanceof FetchError) {
      content = (
        <div className="text-center text-xl h-[350px] text-rose-500">
          <h1>
            {allRestaurantMealsError.message} - {allRestaurantMealsError.info}
          </h1>
        </div>
      );
    }
  } else if (allRestaurantMealsData) {
    if (allRestaurantMealsData.length === 0) {
      content = (
        <div className="text-center text-xl font-bold my-6">
          No meals added!
        </div>
      );
    } else if (allRestaurantMealsData.length < 3) {
      content = (
        <div className="text-center text-xl font-bold my-6 text-red-600">
          You Should Add At Least 3 Meals.
        </div>
      );
    } else {
      content = (
        <Swiper
          onSwiper={(swiper) => setSwiper(swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          spaceBetween={5}
          loop={true}
          modules={[Pagination]}
          className="h-full w-full flex justify-center items-center"
          breakpoints={{
            375: {
              slidesPerView: 1,
            },
            850: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
        >
          {allRestaurantMealsData.length >= 3 && (
            <div className="absolute inset-0  opacity-100 transition ">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  swiper?.slideNext();
                }}
                className={`${activeStyles} right-3 transition`}
                aria-label="next image"
              >
                <ChevronRight className="h-4 w-4 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  swiper?.slidePrev();
                }}
                className={`${activeStyles} left-3 transition`}
                aria-label="previous image"
              >
                <ChevronLeft className="h-4 w-4 text-white" />
              </button>
            </div>
          )}
          {allRestaurantMealsData.map((meal, i) => {
            let slidesPerView = swiper?.params?.slidesPerView;
            if (typeof slidesPerView !== "number") {
              slidesPerView = 1;
            }
            const totalSlides = allRestaurantMealsData.length;

            // Check if the total number of slides is 3, make all slides active
            let isActive = totalSlides === 3;

            if (!isActive) {
              if (slidesPerView === 1) {
                // Only one slide is active
                const middleIndex =
                  (activeIndex + Math.floor(slidesPerView / 2)) % totalSlides;
                isActive = i === middleIndex;
              } else if (slidesPerView === 2) {
                // Both slides are active
                const firstActiveIndex = activeIndex % totalSlides;
                const secondActiveIndex = (activeIndex + 1) % totalSlides;
                isActive = i === firstActiveIndex || i === secondActiveIndex;
              } else if (slidesPerView === 3) {
                // Middle slide is active
                const middleIndex =
                  (activeIndex + Math.floor(slidesPerView / 2)) % totalSlides;
                isActive = i === middleIndex;
              }
            }

            return (
              <SwiperSlide
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  // cursor: "pointer",
                }}
                className="relative h-full mx-auto"
              >
                <div key={meal.id}>
                  <Meals {...meal} isActive={isActive} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      );
    }
  }

  function addNewMealFormHandler() {
    setIsAddMealForm(true);
  }

  return (
    <>
      <div className="relative overflow-hidden rounded-xl ">
        {params.restaurant && (
          <div>
            <h1 className="text-center font-bold my-12 text-4xl pacifico-regular">
              {params.restaurant} Meals
            </h1>

            {content}
          </div>
        )}
      </div>
      <div className="flex flex-row items-center justify-center">
        <button
          onClick={addNewMealFormHandler}
          type="button"
          className=" mb-52 mt-20 px-4 py-2 cursor-poniter text-white rounded-md bg-rose-500 hover:bg-rose-600"
        >
          Add New Meal
        </button>
      </div>
    </>
  );
};
// };

export default Dashboard;
