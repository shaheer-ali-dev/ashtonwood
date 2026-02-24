'use client'

export default function MainHeadingSection() {
  return (
    <section
      id="main-heading"
      className="relative min-h-screen flex items-center justify-center bg-[#E5E7EB]"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">

          <h1 className="font-extrabold leading-tight">
            <span className="text-xl md:text-3xl lg:text-4xl heading-font text-black block">
              THIS ISN’T ABOUT GETTING RESULTS AND FALLING BACK,
            </span>

            <span className="text-xl md:text-3xl lg:text-4xl heading-font text-[#5A5A5A] block mt-2">
              IT’S ABOUT BECOMING THE PERSON WHO NEVER DOES.
            </span>
          </h1>

          <p className="text-sm md:text-base normal-font leading-[22px] md:leading-[26px] text-black">
            This isn’t just about working out.
            This is about stepping into the strongest, most confident version of yourself.
            My 1:1 coaching program is built to help you lift heavy, sharpen your mindset,
            and build the kind of discipline that turns evolution into a lifestyle.
            With customized training, tailored nutrition, and real support, you’ll develop
            the strength — both physically and mentally — to handle anything life throws at you.
            Ready to lock in and become who you were truly meant to be?
          </p>

        </div>
      </div>
    </section>
  )
}