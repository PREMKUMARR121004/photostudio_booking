
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../Context/useAuth'

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null)
  const [bookingstats, setBookingstats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const { token, logout } = useAuth()

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }

    async function fetchDashboard() {
      try {
        setLoading(true)
        setError('')

        
const [dashboardResponse, statsResponse] = await Promise.all([
  axios.get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }),
  axios.get(`${import.meta.env.VITE_API_URL}/api/admin/bookingstats`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
])


        setDashboard(dashboardResponse.data)
        setBookingstats(statsResponse.data)
      } catch (error) {
        console.log(error.response?.data || error.message)
        setError('Unable to load dashboard. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [token])

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const totalBookings = bookingstats?.reduce(
    (total, item) => total + (item.total?.[0]?.count || 0),
    0
  ) || 0

  const getStatusCount = (status) => {
    return bookingstats?.reduce((total, item) => {
      const foundStatus = item.status?.find(
        (booking) => booking._id === status
      )

      return total + (foundStatus?.count || 0)
    }, 0) || 0
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto mt-10 max-w-xl rounded-xl bg-red-50 p-5 text-center text-red-600">
        {error}
        <button
          onClick={() => window.location.reload()}
          className="mt-3 block w-full font-semibold underline"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              PhotoStudio Management
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your photography business and bookings.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Log Out
          </button>
        </div>

        {dashboard && (
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">
              Welcome, {dashboard.name}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Role: <span className="font-medium capitalize text-gray-700">
                {dashboard.role}
              </span>
            </p>
          </div>
        )}

        <div className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Booking Overview
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Total Bookings
              </p>
              <p className="mt-3 text-3xl font-bold text-gray-900">
                {totalBookings}
              </p>
            </div>

            <div className="rounded-2xl border border-yellow-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-yellow-700">
                Pending
              </p>
              <p className="mt-3 text-3xl font-bold text-yellow-600">
                {getStatusCount('pending')}
              </p>
            </div>

            <div className="rounded-2xl border border-green-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-green-700">
                Accepted
              </p>
              <p className="mt-3 text-3xl font-bold text-green-600">
                {getStatusCount('accepted')}
              </p>
            </div>

            <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-red-700">
                Rejected
              </p>
              <p className="mt-3 text-3xl font-bold text-red-600">
                {getStatusCount('rejected')}
              </p>
            </div>

          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <Link
              to="/admin/addservice"
              className="rounded-xl border border-gray-200 bg-white p-5 font-semibold text-gray-800 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <span className="text-lg">＋</span> Add Service
              <p className="mt-2 text-sm font-normal text-gray-500">
                Add a new photography service.
              </p>
            </Link>

            <Link
              to="/admin/getservices"
              className="rounded-xl border border-gray-200 bg-white p-5 font-semibold text-gray-800 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              Manage Services
              <p className="mt-2 text-sm font-normal text-gray-500">
                View, edit, and delete services.
              </p>
            </Link>

            <Link
              to="/admin/allbooking"
              className="rounded-xl border border-gray-200 bg-white p-5 font-semibold text-gray-800 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              Manage Bookings
              <p className="mt-2 text-sm font-normal text-gray-500">
                Review and update customer bookings.
              </p>
            </Link>

          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminDashboard
