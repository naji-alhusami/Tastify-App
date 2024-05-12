import { Check, Star } from "lucide-react";

const Reviews = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl pacifico-regular">Reviews</h1>
      <div className="mx-20 mt-10 flex flex-col justify-center items-center gap-y-6 md:mx-10 md:flex-row md:gap-x-6">
        <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
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
                "The case feels durable and I even got a compliment on the
                design. Had the case for two and a half months now and{" "}
                <span className="p-0.5 bg-slate-800 text-white">
                  the image is super clear
                </span>
                , on the case I had before, the image started fading into
                yellow-ish color after a couple weeks. Love it."
              </p>
            </div>
            <div className="flex gap-4 mt-2">
              <img
                className="rounded-full h-12 w-12 object-cover"
                src="/users/user-1.png"
                alt="user"
              />
              <div className="flex flex-col">
                <p className="font-semibold">Jonathan</p>
                <div className="flex gap-1.5 items-center text-zinc-600">
                  <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                  <p className="text-sm">Verified Purchase</p>
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
                "I usually keep my phone together with my keys in my pocket and
                that led to some pretty heavy scratchmarks on all of my last
                phone cases. This one, besides a barely noticeable scratch on
                the corner,{" "}
                <span className="p-0.5 bg-slate-800 text-white">
                  looks brand new after about half a year
                </span>
                . I dig it."
              </p>
            </div>
            <div className="flex gap-4 mt-2">
              <img
                className="rounded-full h-12 w-12 object-cover"
                src="/users/user-4.jpg"
                alt="user"
              />
              <div className="flex flex-col">
                <p className="font-semibold">Josh</p>
                <div className="flex gap-1.5 items-center text-zinc-600">
                  <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                  <p className="text-sm">Verified Purchase</p>
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
