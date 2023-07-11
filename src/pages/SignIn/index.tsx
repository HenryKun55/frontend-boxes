import { SignInForm } from '@/components/Form/SignIn'
import { Menu } from '@/components/Menu'

export const SignIn = () => {
  return (
    <div>
      <div className="w-screen h-screen bg-gray-100 dark:bg-gray-800">
        <Menu />
        <div className="w-96 h-full flex content-center mt-14 mx-auto">
          <SignInForm />
        </div>
      </div>
    </div>
  )
}
