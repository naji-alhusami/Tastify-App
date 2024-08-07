import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Pagination } from "swiper/modules";
import type SwiperType from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import useMealManager from "../../../utils/custom-hooks/useMealManager";
import Meals from "../Meals";
import Loading from "../../ui/LoadingMeals";
import { FetchError } from "../../../lib/http/error";
import Cuisines from "./Cuisines";

const SwiperMeals = () => {
  const path = useLocation();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const {
    allMealsData,
    allMealsPending,
    allMealsIsError,
    allMealsError,
    filteredMealsData,
    filteredMealsLoading,
    filteredMealsIsError,
    filteredMealsError,
  } = useMealManager();
  
  const activeStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-20 place-items-center rounded-full border-2 bg-rose-500 border-rose-500";

  let content;
  if (allMealsPending || filteredMealsLoading) {
    content = <Loading />;
  } else if (allMealsIsError || filteredMealsIsError) {
    if (
      allMealsError instanceof FetchError ||
      filteredMealsError instanceof FetchError
    ) {
      const error =
        allMealsError instanceof FetchError
          ? allMealsError
          : (filteredMealsError as FetchError);
      content = (
        <div className="text-center text-xl h-[350px] text-rose-500">
          <h1>
            {error.message} - {error.info}
          </h1>
        </div>
      );
    }
  } else if (filteredMealsData) {
    if (filteredMealsData.length === 0) {
      content = (
        <div className="text-center text-xl font-bold my-28">
          No meals of this cuisine!
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
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {filteredMealsData.length >= 3 && (
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
          {filteredMealsData.map((meal, i) => {
            let slidesPerView = swiper?.params?.slidesPerView;
            if (typeof slidesPerView !== "number") {
              slidesPerView = 1;
            }
            const totalSlides = filteredMealsData.length;

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
  } else if (allMealsData) {
    if (allMealsData.length === 0 && allMealsData.length < 3) {
      content = (
        <div className="text-center text-xl font-bold my-20">
          No meals for this restaurant!
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
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {allMealsData.length >= 3 && (
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
          {allMealsData.map((meal, i) => {
            let slidesPerView = swiper?.params?.slidesPerView;
            if (typeof slidesPerView !== "number") {
              slidesPerView = 1;
            }
            const totalSlides = allMealsData.length;

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
                  justifyContent: "space-between",
                  alignItems: "center",
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

  return (
    <div className="relative overflow-hidden rounded-xl mt-16 mb-28 text-center">
      <h1 className="text-4xl pacifico-regular my-6">Tastify Meals</h1>
      {path.pathname === "/meals" && <Cuisines />}
      {content}
    </div>
  );
};

export default SwiperMeals;
