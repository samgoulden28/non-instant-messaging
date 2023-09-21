"use client";

const relationshipBeefs = [
  "You left the toilet seat up",
  "You forgot to take out the trash",
  "You never do the dishes",
  "You left your clothes on the floor",
  "You're always late",
  "You forgot our anniversary",
  "You never put the cap back on the toothpaste",
  "You didn't replace the toilet paper roll",
  "You hog the remote control",
  "You never help with the groceries",
  "You forgot to feed the pet",
  "You snore too loudly",
  "You didn't text me back",
  "You always forget to turn off the lights",
  "You never make the bed",
  "You leave dirty shoes in the living room",
  "You never say 'I love you'",
  "You always forget to close the fridge",
  "You don't help with laundry",
  "You always steal the covers",
  "You leave empty containers in the fridge",
  "You never leave a tip",
  "You always interrupt me",
  "You never listen",
  "You always forget where you put your keys",
  "You talk during movies",
  "You're too loud on the phone",
  "You never put your phone on silent",
  "You never remember my coffee order",
  "You always leave the gas tank empty",
  "You never water the plants",
  "You always forget to lock the door",
  "You never say 'please' or 'thank you'",
  "You leave wet towels on the bed",
  "You eat my leftovers",
  "You never replace the milk",
  "You don't let me pick the music",
  "You never take my advice",
  "You always pick the movie",
  "You never admit when you're wrong",
];

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-between p-2 max-h-screen">
      <div className="w-screen p-4 pb-40 text-6xl font-bold text-center flex justify-center">
        <div className="relative w-56 h-56 flex flex-col justify-between items-center">
          <div className="absolute inset-0 bg-[url(/beef.png)] bg-cover opacity-30"></div>
          <span className="relative z-10 text-4xl pb-8">Welcome to</span>
          <span className="relative z-10 text-4xl">what&apos;s your</span>
          <span className="relative z-10 text-6xl">BEEF</span>
        </div>
      </div>
      <div className="overflow-hidden absolute flex flex-col w-screen gap-4 text-xl md:text-4xl font-bold md:font-normal mt-[-1000px]  h-[10000px] px-4 max-w-full">
        {[...new Array(500)].map((_, id) => {
          const randomBeef = id % relationshipBeefs.length;
          return (
            <span
              key={id}
              className={`animate-scroll ${
                id % 2 === 0 ? "text-right" : ""
              } text-red-300`}
              id="content1"
            >
              {relationshipBeefs[randomBeef]}
            </span>
          );
        })}
      </div>
    </main>
  );
}
