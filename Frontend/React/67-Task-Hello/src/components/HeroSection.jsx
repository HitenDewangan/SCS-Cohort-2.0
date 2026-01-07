import React from 'react'
import heroImage from '../assets/hero-image.png'
export default function HeroSection() {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center relative border-b border-black-200">
      <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
   
        {/* <div className="relative">
          <div className="absolute -left-20 top-0 hidden xl:flex flex-col items-center text-gray-400 text-xs">
            <span className="rotate-180 [writing-mode:vertical-rl] tracking-wider">Product designer</span>
            <div className="h-32 w-px bg-gray-300 my-6" />
            <span className="rotate-180 [writing-mode:vertical-rl]">2024</span>
          </div>

          <div className="flex gap-12 text-gray-700 mb-16">
            <div>
              <p className="text-4xl font-extralight mb-1">+200</p>
              <p className="text-xs text-gray-500 tracking-wide">Project completed</p>
            </div>
            <div>
              <p className="text-4xl font-extralight mb-1">+50</p>
              <p className="text-xs text-gray-500 tracking-wide">Startup raised</p>
            </div>
          </div>

    
          <h1 className="text-7xl md:text-8xl font-extralight text-gray-900 leading-none mb-6 tracking-tight">
            Hello
          </h1>
          <p className="text-gray-600 text-base tracking-wide">— It's D.Nova a design wizerd</p>

  
          <div className="mt-20 flex items-center gap-2 text-gray-400 text-xs tracking-wide">
            <span>Scroll down</span>
            <span className="text-base">↓</span>
          </div>
        </div> */}

        <div>
            <div>
                
            </div>
            <div></div>
            <div></div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          <img
            src={heroImage}
            alt="Designer portrait"
            className="max-h-[600px] w-auto object-contain grayscale"
          />
        </div>
      </div>
    </section>
  );
}