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
import { Box } from '@/pages/Box'

export const Router = () => {
  return (
    <BrowserRouter>
      <DOMRoutes>
        <DOMRoute path={Routes.Home} element={<MainLayout />}>
          <DOMRoute path="*" element={<NotFound />} />
          <DOMRoute index element={<Home />} />
          <DOMRoute path={Routes.Box} element={<Box />} />
        </DOMRoute>
        <DOMRoute path={Routes.SignIn} element={<SignIn />} />
        <DOMRoute path={Routes.NotFound} element={<NotFound />} />
      </DOMRoutes>
    </BrowserRouter>
  )
}
