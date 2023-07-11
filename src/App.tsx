import 'react-toastify/dist/ReactToastify.css'

import { Flowbite, useTheme } from 'flowbite-react'

import store from '@/store'
import { Router } from './routes'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

export const App = () => {
  const { mode } = useTheme()

  return (
    <Provider store={store}>
      <Flowbite>
        <Router />
        <ToastContainer theme={mode} />
      </Flowbite>
    </Provider>
  )
}
