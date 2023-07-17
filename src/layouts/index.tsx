import { useFetchProfileQuery } from '@/api/auth'
import { Menu } from '@/components/Menu'
import { Routes } from '@/routes/routes'
import { selectAuthIsAuthenticated } from '@/store/auth/selector'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const MainLayout = () => {
  const { isLoading } = useFetchProfileQuery()
  const isAuthenticated = useSelector(selectAuthIsAuthenticated)
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100  dark:bg-gray-800">
        Loading...
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={Routes.SignIn}
        state={{ from: location.pathname }}
        replace
      />
    )
  }

  return (
    <div>
      <div className="min-h-screen bg-gray-100  dark:bg-gray-800 p-4">
        <Menu />
        <div className="pt-16"></div>
        <Outlet />
      </div>
    </div>
  )
}
