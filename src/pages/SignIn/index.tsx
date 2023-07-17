import { SignInForm } from '@/components/Form/SignIn'
import { Menu } from '@/components/Menu'
import { Routes } from '@/routes/routes'

export const SignIn = () => {
  return (
    <div>
      <div className="w-screen h-screen bg-gray-100 dark:bg-gray-800 p-4">
        <Menu path={Routes.SignIn} />
        <div className="w-96 pt-16 flex content-center mt-14 mx-auto">
          <SignInForm />
        </div>
      </div>
    </div>
  )
}
