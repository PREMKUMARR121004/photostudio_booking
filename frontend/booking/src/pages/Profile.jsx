
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useAuth from '../Context/useAuth'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const [profile, setProfile] = useState(null)
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [submit, setSubmit] = useState(false)
  const [fetcherror, setFetcherror] = useState('')
  const [updateError, setUpdateError] = useState('')
  const [success, setSuccess] = useState('')

  const { token } = useAuth()
  const navigate=useNavigate()

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }

    async function getProfile() {
      try {
        setLoading(true)
        setFetcherror('')

        
const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/auth/profile`,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)


        setProfile(response.data)
        setName(response.data.name)
        setEmail(response.data.email)
      } catch (error) {
        setFetcherror('Unable to load your profile. Please try again.')
        console.log(error.response?.data || error.message)
      } finally {
        setLoading(false)
      }
    }

    getProfile()
  }, [token])

  async function handleSubmit(event) {
    event.preventDefault()

    setUpdateError('')
    setSuccess('')

    if (!name.trim() || !email.trim()) {
      setUpdateError('Name and email are required.')
      return
    }

    try {
      setSubmit(true)

      
const response = await axios.patch(
  `${import.meta.env.VITE_API_URL}/api/auth/updateprofile`,
  {
    name: name.trim(),
    email: email.trim()
  },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)


      setProfile((previousProfile) => ({
        ...previousProfile,
        name: response.data.name,
        email: response.data.email
      }))

      setName(response.data.name)
      setEmail(response.data.email)
      setEdit(false)
      setSuccess('Profile updated successfully.')
    } catch (error) {
      setUpdateError(
        error.response?.data?.message || 'Unable to update your profile.'
      )
      console.log(error.response?.data || error.message)
    } finally {
      setSubmit(false)
    }
  }

  function handleCancel() {
    setName(profile.name)
    setEmail(profile.email)
    setEdit(false)
    setUpdateError('')
    setSuccess('')
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Loading your profile...</p>
      </div>
    )
  }

  if (fetcherror) {
    return (
      <div className="mx-auto mt-10 max-w-lg rounded-xl bg-red-50 p-5 text-center text-red-600">
        {fetcherror}
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="mx-auto mt-10 max-w-lg rounded-xl bg-gray-50 p-5 text-center text-gray-600">
        Please log in to view your profile.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl">
          <div className='flex justify-end'>
       <button
      onClick={() => navigate(-1)}
      className="rounded-lg border border-gray-300 px-4 py-2  text-sm font-medium text-gray-700 transition hover:bg-gray-100"
    >
      ← Back
    </button></div>

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            My Account
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500">
            View and manage your account details.
          </p>
        </div>

        {success && (
          <div className="mb-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {updateError && (
          <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {updateError}
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="bg-blue-600 px-6 py-8 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-bold text-blue-600">
                {profile.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  {profile.name}
                </h2>

              </div>
            </div>
          </div>

          {!edit ? (
            <div className="p-6 sm:p-8">

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="mt-2 break-words font-semibold text-gray-900">
                    {profile.name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="mt-2 break-words font-semibold text-gray-900">
                    {profile.email}
                  </p>
                </div>

                

              </div>

              <div className="mt-8 border-t border-gray-100 pt-6">
                <button
                  onClick={() => {
                    setEdit(true)
                    setSuccess('')
                    setUpdateError('')
                  }}
                  className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                >
                  Edit Profile
                </button>
              </div>

            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row">
                <button
                  type="submit"
                  disabled={submit}
                  className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submit ? 'Saving...' : 'Save Changes'}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={submit}
                  className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  )
}

export default Profile
