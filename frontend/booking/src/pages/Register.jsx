
import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [nameerror, setnameError] = useState('')
  const [emailerror, setemailError] = useState('')
  const [passworderror, setpasswordError] = useState('')

  const [create, setCreate] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    let hasError = false

    setnameError('')
    setemailError('')
    setpasswordError('')
    setCreate('')
    setError('')

    if (!name.trim()) {
      setnameError('Name is required')
      hasError = true
    }

    if (!email.trim()) {
      setemailError('Email is required')
      hasError = true
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setemailError('Enter a valid email address')
      hasError = true
    }

    if (!password) {
      setpasswordError('Password is required')
      hasError = true
    } else if (password.length < 6) {
      setpasswordError('Password must be at least 6 characters')
      hasError = true
    }

    if (hasError) return

    const user = {
      name: name.trim(),
      email: email.trim(),
      password
    }

    try {
      setLoading(true)

      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        user
      )

      setCreate(
        response.data.message ||
          'Account created successfully! You can now log in.'
      )

      setName('')
      setEmail('')
      setPassword('')

      navigate('/login', {
        state: { registered: true }
      })
    } catch (error) {
      setError(
        error.response?.data?.message ||
          'Unable to create account. Please try again.'
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
            Create Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Join PhotoStudio and book your photography session
          </p>
        </div>

        {create && (
          <div className="mb-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
            {create}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
                setnameError('')
                setCreate('')
                setError('')
              }}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {nameerror && (
              <p className="mt-1 text-sm text-red-500">
                {nameerror}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setemailError('')
                setCreate('')
                setError('')
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
                setpasswordError('')
                setCreate('')
                setError('')
              }}
              placeholder="Create a password"
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
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Register
