import Link from 'next/link'
import { Form as LoginForm } from './form'

export default function LoginPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-green-800">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-gray-100 rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl text-centered">Green-Connect</h1>
        <LoginForm />
        <p className="text-center">
          Need to create an account?{' '}
          <Link className="text-indigo-500 hover:underline" href="/register">
            Create Account
          </Link>{' '}
        </p>
      </div>
    </div>
  )
}
