import { Routes } from '@/routes/routes'
import { useAppDispatch } from '@/store'
import { selectAuthUser } from '@/store/auth/selector'
import { logout } from '@/store/auth/slice'
import { Navbar, Button, DarkThemeToggle, useTheme } from 'flowbite-react'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const Menu = () => {
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

  return (
    <Navbar fluid rounded className="bg-gray-100">
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Box
        </span>
      </Navbar.Brand>
      <div className="flex gap-3 place-items-center md:order-2">
        <DarkThemeToggle onClickCapture={handleTheme} />
        {user && (
          <Button color="dark" onClick={handleLogout}>
            Sign out
          </Button>
        )}
      </div>
    </Navbar>
  )
}
