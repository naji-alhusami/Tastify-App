import SwiperCuisines from "./SwiperCuisines";

const Cuisines = () => {
  return (
    <div className="mx-4 mt-4">
      <div>
        <h1 className="text-4xl">Choose Cuisines:</h1>
      </div>
      <div className="flex justify-center items-center m-4">
        <SwiperCuisines />
      </div>
      {/* <div>
        <Restaurants
          query={{ sort: "desc", limit: 4 }}
          searchParams={searchParams}
        />
      </div> */}
    </div>
  );
};

export default Cuisines;
