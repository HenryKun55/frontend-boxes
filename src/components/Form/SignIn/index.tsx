import { Button, Label, TextInput } from 'flowbite-react'
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
          pending: 'Logando...',
          error: 'Ocorreu um erro, tente novamente.',
          success: 'Logou',
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
          <Label htmlFor="username" value="Username" />
        </div>
        <TextInput
          {...register('username')}
          id="username"
          placeholder="username"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput
          {...register('password')}
          id="password"
          required
          type="password"
        />
      </div>
      <Button className="mt-3" type="submit" disabled={isLoading}>
        Login
      </Button>
    </form>
  )
}
