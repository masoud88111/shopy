'use client';

import { useAppDispatch } from '@/hooks'
import { updatePhoneVerifyToken } from '@/store/auth'
import LoginForm from '@/components/forms/auth/loginForm'
import { useRouter } from 'next/navigation';

const Login = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const setPhoneVerifyToken = (token: string) => {
        dispatch(updatePhoneVerifyToken(token));
    }

    return (
        <>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    {/* <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                        alt="Workflow"
                    /> */}
                    <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Login on Shopy</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <LoginForm setToken={setPhoneVerifyToken} router={router}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
