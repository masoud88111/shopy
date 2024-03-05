'use client';

import Header from '@/components/layouts/header'
import './globals.css'
// import { Vazirmatn } from 'next/font/google'
import localFont from 'next/font/local'
import { Provider } from 'react-redux'
import { store } from '@/store'
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';
import { setUserMutator, updateLoading, updateUser } from '@/store/auth';

// const vazirmatn = Vazirmatn({ subsets: ['latin'] })
const vazir = localFont({
  src: [
    {
      path: './../../public/webfonts/Vazirmatn-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './../../public/webfonts/Vazirmatn-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { user , loading , mutate : userMutate } = useAuth();

  useEffect(() => {
      store.dispatch(updateUser(user))
      store.dispatch(updateLoading(loading))
      if( store.getState().auth.userMutate === undefined ) {
        store.dispatch(setUserMutator(userMutate))
      }
  } , [user , loading , userMutate ]) 
  // console.log(user , loading , userMutate )

  return (
    <html lang="en">
      <Provider store={store}>
        <body className={`${vazir.className} bg-gray-100`} >
            <Header/>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              {children}
            </div>
        </body>
      </Provider>
    </html>
  )
}
