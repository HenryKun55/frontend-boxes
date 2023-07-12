import 'react-toastify/dist/ReactToastify.css'

import { Flowbite, useTheme } from 'flowbite-react'

import store from '@/store'
import { Router } from './routes'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { themeMode } from './utils/theme'

export const App = () => {
  const theme = useTheme()

  return (
    <Provider store={store}>
      <Flowbite theme={{ dark: theme.mode === 'dark' || themeMode === 'dark' }}>
        <Router />
        <ToastContainer theme={theme.mode ?? themeMode} />
      </Flowbite>
    </Provider>
  )
}
