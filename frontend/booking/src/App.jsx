
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import Addservices from './pages/Addservices'
import Getservices from './pages/Getservices'
import Portfolio from './pages/Portfolio'
import AddBooking from './pages/AddBooking'
import MyBooking from './pages/MyBooking'
import AdminAllBooking from './pages/AdminAllBooking'
import Navbar from './pages/Navbar'
import PublicPortfolio from './pages/PublicPortfolio'
import Home from './pages/Home'
import Services from './pages/Services'
import ContactUs from './pages/ContactUs'

import ProtectedRoutes from './Components/ProtectedRoutes'
import AdminRoutes from './Components/AdminRoutes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages - anyone can visit */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        <Route
          path="/portfolio"
          element={
            <>
              <Navbar />
              <PublicPortfolio />
            </>
          }
        />

        <Route
          path="/services"
          element={
            <>
              <Navbar />
              <Services />
            </>
          }
        />

        <Route
          path="/contactus"
          element={
            <>
              <Navbar />
              <ContactUs />
            </>
          }
        />

        {/* Login and Register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Customer pages - login required */}
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/bookingservice"
          element={
            <ProtectedRoutes>
              <AddBooking />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/mybooking"
          element={
            <ProtectedRoutes>
              <MyBooking />
            </ProtectedRoutes>
          }
        />

        {/* Admin pages - admin login required */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoutes>
              <AdminDashboard />
            </AdminRoutes>
          }
        />

        <Route
          path="/admin/addservice"
          element={
            <AdminRoutes>
              <Addservices />
            </AdminRoutes>
          }
        />

        <Route
          path="/admin/getservices"
          element={
            <AdminRoutes>
              <Getservices />
            </AdminRoutes>
          }
        />

        <Route
          path="/admin/getportfolio"
          element={
            <AdminRoutes>
              <Portfolio />
            </AdminRoutes>
          }
        />

        <Route
          path="/admin/allbooking"
          element={
            <AdminRoutes>
              <AdminAllBooking />
            </AdminRoutes>
          }
        />

        {/* Unknown URL - return to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
