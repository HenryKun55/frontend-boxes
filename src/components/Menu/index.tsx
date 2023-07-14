import { Routes } from '@/routes/routes'
import { useAppDispatch } from '@/store'
import { selectAuthUser } from '@/store/auth/selector'
import { logout } from '@/store/auth/slice'
import { Navbar, Button, DarkThemeToggle, useTheme } from 'flowbite-react'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BsBox } from 'react-icons/bs'

export type MenuProps = {
  path?: Routes
}

export const Menu = ({ path }: MenuProps) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const user = useSelector(selectAuthUser)

  const handleLogout = useCallback(() => {
    dispatch(logout())
    navigate(Routes.SignIn)
  }, [])

  const handleTheme = () => {
    localStorage.setItem(
      '@box/color-theme',
      theme.mode === 'light' ? 'dark' : 'light',
    )
  }

  const actionPaths = () => {
    switch (true) {
      case path === Routes.SignIn:
        return (
          <Button color="dark" onClick={() => navigate(Routes.SignUp)}>
            Sign Up
          </Button>
        )
      case path === Routes.SignUp:
        return (
          <Button color="dark" onClick={() => navigate(Routes.SignIn)}>
            Sign In
          </Button>
        )
      case user !== null:
        return (
          <Button color="dark" onClick={handleLogout}>
            Sign out
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <Navbar fluid rounded className="bg-gray-100">
      <Navbar.Brand href="/" className="gap-3">
        <BsBox size={22} className="fill-gray-500 dark:fill-gray-200" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Box
        </span>
      </Navbar.Brand>
      <div className="flex gap-3 place-items-center md:order-2">
        <DarkThemeToggle onClickCapture={handleTheme} />
        {actionPaths()}
      </div>
    </Navbar>
  )
}
