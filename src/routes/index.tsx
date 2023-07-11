import {
  BrowserRouter,
  Route as DOMRoute,
  Routes as DOMRoutes,
} from 'react-router-dom'

import { Routes } from './routes'
import { MainLayout } from '@/layouts'
import { NotFound } from '@/pages/NotFound'
import { Home } from '@/pages/Home'
import { SignIn } from '@/pages/SignIn'

export const Router = () => {
  return (
    <BrowserRouter basename={import.meta.env.DEV ? '/' : '/frontend-boxes/'}>
      <DOMRoutes>
        <DOMRoute path={Routes.Home} element={<MainLayout />}>
          <DOMRoute path="*" element={<NotFound />} />
          <DOMRoute index element={<Home />} />
        </DOMRoute>
        <DOMRoute path={Routes.SignIn} element={<SignIn />} />
      </DOMRoutes>
    </BrowserRouter>
  )
}
