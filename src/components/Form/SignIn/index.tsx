import { zodResolver } from '@hookform/resolvers/zod'
import { useSignInMutation } from '@/api/auth'
import { useForm } from 'react-hook-form'
import schema, { FormProps } from './validators'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Routes } from '@/routes/routes'

export const SignInForm = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FormProps>({
    resolver: zodResolver(schema),
  })
  const [signIn, { isLoading }] = useSignInMutation()

  const onSubmit = useCallback(
    ({ username, password }: FormProps) => {
      toast.promise(
        signIn({
          username,
          password,
        })
          .unwrap()
          .then(() => navigate(Routes.Home)),
        {
          error: 'An error has occurred, please try again.',
        },
      )
    },
    [isLoading],
  )

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="mb-2 block">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Username
          </label>
        </div>
        <input
          {...register('username')}
          id="username"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="scoobydoo"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
        </div>
        <input
          {...register('password')}
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="scobby@doo.bdoo"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        disabled={isLoading}>
        Login
      </button>
    </form>
  )
}
