import { Check, Star } from "lucide-react";

const Reviews = () => {
  return (
    <div className="text-center mt-52">
      <h1 className="text-4xl pacifico-regular">Reviews</h1>
      <div className="mx-20 mt-10 flex flex-col justify-center items-center gap-y-6 md:mx-10 md:flex-row md:gap-x-6">
        <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
          <div className="flex flex-auto flex-col gap-4 lg:pr-12 xl:pr-20">
            <div className="flex gap-0.5 mb-2">
              <Star className="h-5 w-5 text-rose-500 fill-rose-500" />
              <Star className="h-5 w-5 text-rose-500 fill-rose-500" />
              <Star className="h-5 w-5 text-rose-500 fill-rose-500" />
              <Star className="h-5 w-5 text-rose-500 fill-rose-500" />
              <Star className="h-5 w-5 text-rose-500 fill-rose-500" />
            </div>
            <div className="text-lg leading-8">
              <p>
                Tastify isn't just a food order application; it's a speed demon!
                The lightning-fast interface and highly efficient filtering
                methods make finding the perfect meal a breeze. Whether I'm in
                the mood for a quick bite or a lavish feast,
                <span className="p-0.5 bg-amber-500 text-white">
                  Tastify gets me there in record time.
                </span>
                Signing in and out is as easy as pie, adding to the seamless
                experience.
              </p>
            </div>
            <div className="flex gap-4 mt-2">
              <img
                className="rounded-full h-12 w-12 object-cover"
                src="/Images/Alex.jpg"
                alt="user"
              />
              <div className="flex flex-col">
                <p className="font-semibold">Alex</p>
                <div className="flex gap-1.5 items-center text-zinc-600">
                  <Check className="h-4 w-4 stroke-[3px] text-rose-500" />
                  <p className="text-sm">Verified Customer</p>
                </div>
              </div>
            </div>
          </div>

          {/* second user review */}
          <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
            <div className="flex gap-0.5 mb-2">
              <Star className="h-5 w-5 text-rose-500 fill-rose-500" />
              <Star className="h-5 w-5 text-rose-500 fill-rose-500" />
              <Star className="h-5 w-5 text-rose-500 fill-rose-500" />
              <Star className="h-5 w-5 text-rose-500 fill-rose-500" />
              <Star className="h-5 w-5 text-rose-500 fill-rose-500" />
            </div>
            <div className="text-lg leading-8">
              <p>
                Tastify has exceeded my expectations! The user interface is
                sleek and intuitive, making it a breeze to browse through the
                diverse range of cuisines in the restaurant. Placing an order is
                quick and hassle-free, and the delivery time is impressively
                prompt. Not to mention,
                <span className="p-0.5 bg-amber-500 text-white">
                  the food quality has consistently been top-notch! 
                </span>
                 Highly recommended!"
              </p>
            </div>
            <div className="flex gap-4 mt-2">
              <img
                className="rounded-full h-12 w-12 object-cover"
                src="/Images/Emma.jpg"
                alt="user"
              />
              <div className="flex flex-col">
                <p className="font-semibold">Emma</p>
                <div className="flex gap-1.5 items-center text-zinc-600">
                  <Check className="h-4 w-4 stroke-[3px] text-rose-500" />
                  <p className="text-sm">Verified Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
