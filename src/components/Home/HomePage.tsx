import Starting from "./Starting";
import OrderSteps from "./OrderSteps";
import SwiperMeals from "../SellerAndBuyer/BuyerMeals/SwiperMeals";
import Reviews from "./Reviews";
import { useAppSelector } from "../../store/redux/hooks";
import useMealManager from "../../utils/custom-hooks/useMealManager";

const Home = () => {
  const user = useAppSelector((state) => state.users);
  const { allMealsData } = useMealManager();

  return (
    <div>
      <Starting />
      <OrderSteps />
      {(!user.userlogin || (user.userlogin && user.user.role === "buyer")) &&
        allMealsData && <SwiperMeals />}
      <Reviews />
    </div>
  );
};

export default Home;
