import Meals from "./Meals";
import SwiperCuisines from "./SwiperCuisines";

const MealsPage = () => {
  return (
    <div className="mx-4 mt-4">
      <div>
        <h1 className="text-4xl">Choose Cuisines:</h1>
      </div>
      <div className="flex justify-center items-center m-4">
        <SwiperCuisines />
      </div>
      <div>
        <Meals />
      </div>
    </div>
  );
};

export default MealsPage;
