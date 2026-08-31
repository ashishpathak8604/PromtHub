
import React from "react";
import cat from "../../assets/pic21.png";

export default function CollectionHero() {
  return (
   <section className="relative w-full overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 pt-10 sm:pt-14 text-center">

    {/* Heading */}
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#252525]">
      Curated Collections
    </h1>

    {/* Small supporting text if you have one */}
    <p className="mt-3 text-sm sm:text-base text-[#77756F] max-w-xl mx-auto">
      Explore carefully curated collections of prompts, ideas, and inspiration.
    </p>

    {/* Cats */}
    <div className="mt-6 flex justify-center">
      <img
        src={cat}
        alt="Curated collections cats"
        className="w-[280px] sm:w-[340px] md:w-[400px] h-auto object-contain"
      />
    </div>

  </div>
</section>
  );
}