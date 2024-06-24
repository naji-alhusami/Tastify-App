import { OrderStepsData } from "./OrderSteps-data";

export default function OrderSteps() {
  return (
    <div className="text-center my-52">
      <h1 className="text-4xl pacifico-regular">Order Steps</h1>
      <div className="mx-20 mt-10 flex flex-col justify-center items-center gap-y-6 md:mx-10 md:flex-row md:gap-x-6">
        {OrderStepsData.map((step) => (
          <div
            key={step.id}
            className="flex flex-col justify-center items-center gap-y-4 mx-8"
          >
            <h2 className="text-center font-bold">{step.header}</h2>
            <img src={step.icon} alt={step.header} className="w-20 h-20" />
            <p className="text-center">{step.paragraph}</p>
            {/* {step.arrow && <img
              src={step.arrow}
              alt={step.header}
              className={`${step.style} flex justify-start items-start w-20 h-20 text-rose-500 fill-rose-500 transform rotate-45`}
            />} */}
          </div>
        ))}
      </div>
    </div>
  );
}
