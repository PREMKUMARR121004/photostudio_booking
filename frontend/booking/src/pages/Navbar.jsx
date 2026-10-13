
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Authcontext } from '../Context/AuthContext'

function Navbar() {
  const { token, role, logout } = useContext(Authcontext)
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <nav className="sticky top-0 z-50 flex flex-col gap-4 bg-white px-5 py-4 shadow-md sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        PhotoStudio
      </Link>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium text-gray-700">
        <Link to="/" className="transition hover:text-blue-600">
          Home
        </Link>

        <Link to="/portfolio" className="transition hover:text-blue-600">
          Portfolio
        </Link>

        <Link to="/services" className="transition hover:text-blue-600">
          Services
        </Link>

        <Link to="/contactus" className="transition hover:text-blue-600">
          Contact Us
        </Link>

        {!token && (
          <>
            <Link
              to="/login"
              className="transition hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              Register
            </Link>
          </>
        )}

        {token && role === 'customer' && (
          <>
            <Link
              to="/bookingservice"
              className="transition hover:text-blue-600"
            >
              Book a Session
            </Link>

            <Link
              to="/mybooking"
              className="transition hover:text-blue-600"
            >
              My Bookings
            </Link>

            <Link
              to="/profile"
              className="transition hover:text-blue-600"
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        )}

        {token && role === 'admin' && (
          <>
            <Link
              to="/admin/dashboard"
              className="transition hover:text-blue-600"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
