
import React from 'react'
import { Link } from 'react-router-dom'
import PublicPortfolio from './PublicPortfolio'
import Services from './Services'
import ContactUs from './ContactUs'

function Home() {
  return (
    <div className="min-h-screen bg-stone-50">

      {/* Hero Section */}
      <section className="overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-5 py-8 sm:px-8 sm:py-10 md:py-12 lg:grid-cols-2 lg:gap-12 lg:px-12">

          {/* Left Side */}
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-blue-600 sm:text-sm">
              Welcome to PhotoStudio
            </p>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Every Moment
              <span className="mt-1 block font-serif italic text-blue-600">
                Tells a Story.
              </span>
            </h1>

            <p className="mt-4 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
              From weddings to life's special occasions, we capture the
              moments that matter and turn them into memories that last
              a lifetime.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/bookingservice"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Book a Session
                <span className="ml-2" aria-hidden="true">→</span>
              </Link>

              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 transition hover:border-blue-600 hover:text-blue-600"
              >
                Explore Our Work
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-3 border-t border-gray-200 pt-4">
              <span className="h-1 w-10 rounded-full bg-blue-600" />
              <p className="text-sm text-gray-500">
                Thoughtfully captured. Beautifully remembered.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative">
            <div className="absolute -bottom-4 -left-4 h-28 w-28 rounded-2xl bg-blue-100 sm:-bottom-5 sm:-left-5 sm:h-36 sm:w-36" />

            <img
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=85"
              alt="Professional camera and photography equipment"
              className="relative h-64 w-full rounded-2xl object-cover shadow-xl sm:h-80 lg:h-[420px]"
            />

            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/50 bg-white/90 p-4 backdrop-blur-sm sm:bottom-6 sm:left-6 sm:right-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                Your story, our lens
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-900 sm:text-xl">
                Moments worth keeping.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Portfolio Section */}
      <section className="bg-stone-50 py-6 sm:py-8">
        <PublicPortfolio />
      </section>

      {/* Services Section */}
      <section className="bg-white py-6 sm:py-8">
        <Services />
      </section>

      {/* Contact Us Section */}
      <ContactUs />

    </div>
  )
}

export default Home
