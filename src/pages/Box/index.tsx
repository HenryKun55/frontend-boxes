import { useFetchBoxQuery } from '@/api/boxes'
import { Routes } from '@/routes/routes'
import { Navigate, useParams } from 'react-router-dom'
import { BsBox } from 'react-icons/bs'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Dropzone } from '@/components/Dropzone'
import { ListFiles } from '@/features/Files/List'

export const Box = () => {
  const params = useParams<{ boxId: string }>()
  const id = params.boxId || ''

  const { data: { box } = {}, isLoading } = useFetchBoxQuery({ id })

  if (!isLoading && !box) {
    return <Navigate to={Routes.NotFound} replace />
  }

  return (
    <div className="flex w-full flex-col gap-4 py-6 px-2 sm:px-4">
      <Breadcrumb />
      <div className="flex items-center gap-6 py-6">
        <BsBox size={36} className="fill-gray-500 dark:fill-gray-200" />
        <h2 className="text-4xl font-extrabold dark:text-white">{box?.name}</h2>
      </div>
      <Dropzone boxId={id} />
      <ListFiles boxId={id} />
    </div>
  )
}
