import { SignUpForm } from '@/components/Form/SignUp'
import { Menu } from '@/components/Menu'
import { Routes } from '@/routes/routes'

export const SignUp = () => {
  return (
    <div>
      <div className="w-screen h-screen bg-gray-100 dark:bg-gray-800 p-4">
        <Menu path={Routes.SignUp} />
        <div className="w-96 h-full flex content-center mt-14 mx-auto">
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}
