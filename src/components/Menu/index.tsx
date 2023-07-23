import { Routes } from '@/routes/routes'
import { useAppDispatch } from '@/store'
import { selectAuthUser } from '@/store/auth/selector'
import { logout } from '@/store/auth/slice'
import { Navbar, Button, DarkThemeToggle, useTheme } from 'flowbite-react'
import { Fragment, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BsBox } from 'react-icons/bs'
import { ModalCreateBox } from '@/features/Box/Modal/Create'

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
          <Fragment>
            <ModalCreateBox />
            <Button color="dark" onClick={handleLogout}>
              Sign out
            </Button>
          </Fragment>
        )
      default:
        return null
    }
  }

  return (
    <Navbar
      fluid
      rounded
      className="bg-gray-100 fixed w-full z-20 top-0 left-0 border-b">
      <Navbar.Brand href="/" className="gap-3">
        <BsBox size={22} className="fill-gray-500 dark:fill-gray-200" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Box
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <div className="flex flex-row justify-end gap-3 place-items-center md:order-2">
          <DarkThemeToggle onClickCapture={handleTheme} />
          {actionPaths()}
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}
