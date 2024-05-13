import Footer from "./Footer";
import OrderSteps from "./OrderSteps";
import Reviews from "./Reviews";
import Starting from "./Starting";

const Home = () => {
  return (
    <div>
      <Starting />
      <OrderSteps />
      <Reviews />
      <Footer />
    </div>
  );
};

export default Home;
