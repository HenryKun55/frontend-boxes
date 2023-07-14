import { FaHome } from 'react-icons/fa'

export const NotFound = () => {
  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Ops, we ne not found, sorry
      </h1>
      <a
        href="#"
        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
        Back to home
        <FaHome size={24} />
      </a>
    </div>
  )
}
