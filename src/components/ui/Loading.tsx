import { Bike } from "lucide-react";

const Loading = () => {
  return (
    <div className="m-4 border border-gray-200 rounded-lg hover:bg-rose-100 overflow-hidden hover:scale-100">
      <div className="w-full h-[250px] bg-gray-500">
      </div>
      <div className="p-4">
        <div className="text-xl font-semibold bg-gray-300"></div>
        <p className="bg-gray-300"></p>
        <p className="bg-gray-300"></p>
        <div className="flex flex-row text-rose-500">
          <Bike color="#8c8c8c" strokeWidth={1} />
          <p className="#8c8c8c"></p>
        </div>
        <div className="flex justify-end items-center">
          <div
            // onClick={addToBasketHandler}
            className="bg-gray-300 px-2 py-1 rounded-md mt-4 text-white"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
