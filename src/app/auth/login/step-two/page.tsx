'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import PhoneVerifyForm from '@/components/forms/auth/phoneVerifyForm'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getUserMutator, selectPhoneVerifyToken, updatePhoneVerifyToken } from '@/store/auth';

const PhoneVerify = () => {

    const router = useRouter();
    const dispatch = useAppDispatch();
    const userMutate = useAppSelector(getUserMutator);
    // console.log(userMutate)
    const token = useAppSelector(selectPhoneVerifyToken);

    const clearPhoneVerifyToken = () => {
        dispatch(updatePhoneVerifyToken(undefined))
    }

    useEffect(() => {
        if(token === undefined) {
            router.push('/auth/login')
        }

        return () => {
            clearPhoneVerifyToken();
        }
    },[token]);

    return (
        <>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Login Phone Verify</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

                        <PhoneVerifyForm token={token} clearToken={clearPhoneVerifyToken} router={router} userMutate={userMutate} />
                    </div>
                </div>
            </div>
        </>
    )
}


export default PhoneVerify
