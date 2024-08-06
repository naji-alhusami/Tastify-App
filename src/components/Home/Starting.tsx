import AddressLocator from "./AddressLocator";
import { useAppSelector } from "../../store/redux/hooks";
import HomeImage from "/Images/home-image.jpg";
import Button from "../ui/Button";

const Starting = () => {
  const userLogin = useAppSelector((state) => state.users.userlogin);
  const userRole = useAppSelector((state) => state.users.user);

  return (
    <div>
      <div>
        <div>
          <img
            src={HomeImage}
            alt="home-image"
            className="w-full h-full brightness-90"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="mx-24 text-center absolute top-24 text-md font-bold tracking-tight text-gray-900 sm:mx-40 sm:text-3xl md:mx-52 md:top-32 lg:mx-72 lg:top-32 lg:text-5xl">
            Everything You Need Is Brought To Your Door With Our{" "}
            <span className="text-rose-500">Delivery Service</span>..
          </h1>
          {userLogin && userRole.role === "buyer" && (
            <div className="relative w-full flex flex-col justify-between bg-white p-4 rounded-md gap-2 shadow-lg md:absolute md:flex-row md:max-w-2xl lg:top-96">
              <AddressLocator />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center my-10">
        <Button
          type="button"
          className=" bg-rose-500 hover:bg-rose-600 rounded-md px-4 py-2 text-white"
        >
          Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Starting;
