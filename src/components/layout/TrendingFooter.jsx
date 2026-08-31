import dogImage from '../../assets/pic15.png';

export default function TrendingFooter() {
  return (
    <section className="max-w-3xl mx-auto w-full px-4 mt-0 mb-0">

      <div
        className="
          relative
          overflow-hidden

          min-h-[260px]

          rounded-3xl
          border border-black/[0.06]

          bg-[#F5F3EE]

          px-8
          sm:px-12
          md:px-16

          flex
          items-center
        "
      >

        {/* =====================================================
            DOG — LEFT SIDE
        ===================================================== */}
        <div
          className="
            absolute
            left-4
            sm:left-8
            md:left-12

            bottom-0

            w-[170px]
            sm:w-[200px]
            md:w-[200px]

            z-10

            pointer-events-none
            select-none
          "
        >
          <img
            src={dogImage}
            alt=""
            aria-hidden="true"
            className="
              block
              w-full
              h-auto

              object-contain

              drop-shadow-[0_12px_14px_rgba(35,30,20,0.16)]
            "
          />
        </div>


        {/* =====================================================
            CONTENT — RIGHT SIDE
        ===================================================== */}
        <div
          className="
            relative
            z-20

            w-full

            ml-[150px]
            sm:ml-[180px]
            md:ml-[220px]

            max-w-2xl

            py-12
          "
        >

          <p
            className="
              text-xs
              font-medium
              uppercase
              tracking-[0.16em]

              text-[#8A8881]

              mb-3
            "
          >
            Trending
          </p>


          <h2
            className="
              text-2xl
              sm:text-3xl
              md:text-4xl

              font-semibold
              tracking-[-0.035em]

              text-[#252525]

              mb-4
            "
          >
            See what everyone is
            <span className="text-[#F59E0B]"> prompting.</span>
          </h2>


          <p
            className="
              text-sm
              sm:text-base

              leading-relaxed

              text-[#8A8881]

              max-w-lg

              mb-6
            "
          >
            Discover the prompts people are using right now.
            Find inspiration, try something new, and stay ahead
            of what's trending.
          </p>

        </div>

      </div>

    </section>
  );
}