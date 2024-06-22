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
        <div>
          <SwiperMeals />
        </div>
      </div>
    </>
  );
};

export default MealsPage;
