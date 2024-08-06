import { useLocation } from "react-router-dom";

const LoadingMeals = () => {
  const path = useLocation();

  return (
    <div className="flex flex-row justify-center md:justify-between items-center mx-20 mb-20">
      <div className="w-[275px] flex flex-col justify-center items-center border-2 border-amber-400 rounded-md">
        <div className="p-4">
          <div className="w-[230px] h-[230px] bg-gray-300 rounded-md"></div>
        </div>
        <div className="p-4 flex flex-col justify-center items-center">
          <div className="w-[100px] h-[25px] bg-gray-300 rounded-md"></div>
          <div className="w-[100px] h-[25px] bg-gray-300 my-4 rounded-md"></div>
          <div className="w-[25px] h-[25px] bg-gray-300 rounded-md my-4"></div>

          {path.pathname === "/meals" ? (
            <>
              <div className="flex justify-center items-center">
                <div className="w-[90px] h-[30px] bg-gray-300 rounded-md"></div>
              </div>
            </>
          ) : (
            <div className="flex flex-row justify-between items-center">
              <div className="w-[90px] h-[30px] bg-gray-300 rounded-md mr-10"></div>
              <div className="w-[90px] h-[30px] bg-gray-300 rounded-md ml-10"></div>
            </div>
          )}
        </div>
      </div>
      <div className="hidden w-[275px] md:flex flex-col justify-center items-center border-2 border-amber-400 rounded-md">
        <div className="p-4">
          <div className="w-[230px] h-[230px] bg-gray-300 rounded-md"></div>
        </div>
        <div className="p-4 flex flex-col justify-center items-center">
          <div className="w-[100px] h-[25px] bg-gray-300 rounded-md"></div>
          <div className="w-[100px] h-[25px] bg-gray-300 my-4 rounded-md"></div>
          <div className="w-[25px] h-[25px] bg-gray-300 rounded-md my-4"></div>

          {path.pathname === "/meals" ? (
            <>
              <div className="flex justify-center items-center">
                <div className="w-[90px] h-[30px] bg-gray-300 rounded-md"></div>
              </div>
            </>
          ) : (
            <div className="flex flex-row justify-between items-center">
              <div className="w-[90px] h-[30px] bg-gray-300 rounded-md mr-10"></div>
              <div className="w-[90px] h-[30px] bg-gray-300 rounded-md ml-10"></div>
            </div>
          )}
        </div>
      </div>
      <div className="hidden w-[275px] lg:flex flex-col justify-center items-center border-2 border-amber-400 rounded-md">
        <div className="p-4">
          <div className="w-[230px] h-[230px] bg-gray-300 rounded-md"></div>
        </div>
        <div className="p-4 flex flex-col justify-center items-center">
          <div className="w-[100px] h-[25px] bg-gray-300 rounded-md"></div>
          <div className="w-[100px] h-[25px] bg-gray-300 my-4 rounded-md"></div>
          <div className="w-[25px] h-[25px] bg-gray-300 rounded-md my-4"></div>

          {path.pathname === "/meals" ? (
            <>
              <div className="flex justify-center items-center">
                <div className="w-[90px] h-[30px] bg-gray-300 rounded-md"></div>
              </div>
            </>
          ) : (
            <div className="flex flex-row justify-between items-center">
              <div className="w-[90px] h-[30px] bg-gray-300 rounded-md mr-10"></div>
              <div className="w-[90px] h-[30px] bg-gray-300 rounded-md ml-10"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingMeals;
