import { useParams } from 'react-router-dom'
import { Fragment } from 'react'
import { Routes } from '@/routes/routes'
import { GoHomeFill } from 'react-icons/go'
import { BsBox } from 'react-icons/bs'

export const Breadcrumb = () => {
  const params = useParams<{ boxId: string }>()
  const id = params.boxId || ''

  const routes = location.pathname
    .split('/')
    .map(route => route)
    .filter(route => route !== undefined)

  const theRoutes = routes.map(route => {
    switch (true) {
      case route === '':
        return {
          path: Routes.Home,
          name: 'Home',
          icon: <GoHomeFill size={20} />,
        }
      case route === 'box':
        return {
          path: Routes.Box.replace(':boxId', id),
          name: 'Box',
          icon: <BsBox size={18} />,
        }
      default:
        return {
          path: '',
          name: '',
          icon: <></>,
        }
    }
  })

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {theRoutes.map((route, key) => (
          <Fragment key={route.path + route.name}>
            {key === 0 ||
              (key !== theRoutes.length - 1 && (
                <li>
                  <div className="flex items-center">
                    <svg
                      className="w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                  </div>
                </li>
              ))}
            <li className="inline-flex items-center">
              <a
                href={route.path}
                className="inline-flex gap-2 items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                {route.icon}
                {route.name}
              </a>
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}
