import { CreateBox } from '@/features/Box/Create'
import { ListBox } from '@/features/Box/List'

export const Home = () => {
  return (
    <div className="flex w-full flex-col gap-6 py-6">
      <h1 className="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Upload your files anywhere you are!
      </h1>
      <div className="w-full max-w-4xl flex flex-col mx-auto gap-8">
        <CreateBox />
        <ListBox />
      </div>
    </div>
  )
}
