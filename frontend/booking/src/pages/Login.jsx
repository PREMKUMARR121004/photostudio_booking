
import React, { useState, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Authcontext } from '../Context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailerror, setEmailerror] = useState('')
  const [passworderror, setPassworderror] = useState('')
  const [loginerror, setLoginerror] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useContext(Authcontext)
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from

  async function handleSubmit(event) {
    event.preventDefault()

    let hasError = false

    setEmailerror('')
    setPassworderror('')
    setLoginerror('')

    if (!email.trim()) {
      setEmailerror('Email is required')
      hasError = true
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailerror('Enter a valid email address')
      hasError = true
    }

    if (!password) {
      setPassworderror('Password is required')
      hasError = true
    }

    if (hasError) return

    try {
      setLoading(true)

      const response = await login(email.trim(), password)

      if (response.role === 'admin') {
        navigate('/admin/dashboard', { replace: true })
      } else {
        navigate(from || '/', { replace: true })
      }
    } catch (error) {
      setLoginerror(
        error.response?.data?.message ||
          'Login failed. Please check your details.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Login to continue to PhotoStudio
          </p>
        </div>

        {loginerror && (
          <p className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {loginerror}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setEmailerror('')
                setLoginerror('')
              }}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {emailerror && (
              <p className="mt-1 text-sm text-red-500">
                {emailerror}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
                setPassworderror('')
                setLoginerror('')
              }}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {passworderror && (
              <p className="mt-1 text-sm text-red-500">
                {passworderror}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login
