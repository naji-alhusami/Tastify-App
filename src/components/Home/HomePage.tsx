import SwiperMeals from "../Cuisines/SwiperMeals";
import OrderSteps from "./OrderSteps";
import Reviews from "./Reviews";
import Starting from "./Starting";

const Home = () => {
  return (
    <div>
      <Starting />
      <OrderSteps />
      <SwiperMeals />
      <Reviews />
    </div>
  );
};

export default Home;
