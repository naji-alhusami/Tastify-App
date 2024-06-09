import Cuisines from "./Cuisines";
import SwiperMeals from "./SwiperMeals";

const MealsPage = () => {
  return (
    <>
      <div className="mt-4">
        <div className="mx-6 md:mx-12">
          <h1 className="text-4xl">Choose Cuisines:</h1>
          <Cuisines />
        </div>
        <div className="flex justify-center items-center m-4">
          <SwiperMeals />
        </div>
      </div>
    </>
  );
};

export default MealsPage;
