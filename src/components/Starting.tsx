import HomeImage from "../assets/home-image.jpg";

const Starting = () => {
  return (
    <div>
      <div>
        <img
          src={HomeImage}
          alt="home-image"
          className="w-full h-full brightness-90"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="mx-24 text-center absolute top-20 text-md font-bold tracking-tight text-gray-900 sm:mx-52 sm:text-3xl md:mx-70 md:top-32 lg:mx-72 lg:top-24 lg:text-5xl">
          Everything You Need Is Brought To Your Door With Our{" "}
          <span className="text-rose-500">Delivery Service</span>..
        </h1>
      </div>
    </div>
  );
};

export default Starting;
