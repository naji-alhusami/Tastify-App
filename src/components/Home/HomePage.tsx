import Starting from "./Starting";
import OrderSteps from "./OrderSteps";
import SwiperMeals from "../SellerAndBuyer/BuyerMeals/SwiperMeals";
import Reviews from "./Reviews";
import { useAppSelector } from "../../store/redux/hooks";

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
