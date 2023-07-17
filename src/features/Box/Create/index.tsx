import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useCreateBoxMutation } from '@/api/boxes'
import schema, { FormProps } from './validators'

export const CreateBox = () => {
  const [createBox, { isLoading }] = useCreateBoxMutation()

  const formMethods = useForm<FormProps>({
    resolver: zodResolver(schema),
  })

  const { register, handleSubmit, reset } = formMethods

  const onSubmit = useCallback((values: unknown) => {
    const data = values as FormProps
    toast.promise(
      createBox(data)
        .unwrap()
        .then(() => reset()),
      {
        pending: 'Creating...',
        error: 'An error has occurred, please try again.',
        success: 'Box created.',
      },
    )
  }, [])

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="mb-2 block">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
        </div>
        <input
          {...register('name')}
          id="username"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="scoobydoo"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        disabled={isLoading}>
        Create
      </button>
    </form>
  )
}
