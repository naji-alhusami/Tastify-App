import { useAppSelector } from "../../store/redux/hooks";
import SwiperMeals from "../Cuisines/SwiperMeals";
import OrderSteps from "./OrderSteps";
import Reviews from "./Reviews";
import Starting from "./Starting";

const Home = () => {
  const user = useAppSelector((state) => state.users);

  return (
    <div>
      <Starting />
      <OrderSteps />
      {(!user.userlogin || (user.userlogin && user.user.role === "buyer")) && (
        <SwiperMeals />
      )}
      <Reviews />
    </div>
  );
};

export default Home;
