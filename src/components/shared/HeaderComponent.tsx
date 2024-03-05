
import { useSelector } from "react-redux";
import { selectUser, selectUserLoading } from "@/store/auth";
import { Form, FormikProps } from "formik";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import EditInactiveIcon from "./form/EditInactiveIcon";
import DeleteActiveIcon from "./form/DeleteActiveIcon";
import Link from 'next/link';
import { removeLoginToken } from "@/helpers/auth";
import {KeyedMutator} from 'swr';
import { useRouter } from 'next/navigation';
import { useAppSelector } from "@/hooks";
import { getImgProps } from "next/dist/shared/lib/get-img-props";
import ProductsPage from "@/app/products/page";
import { UserType } from "@/models/user";

interface Props {
  userMutate? : KeyedMutator<UserType>
}
   

const links = [
  { href: 'auth/logout', label: 'Sign Out' },
]

export default function HeaderComponent({userMutate}:Props) {
  const router = useRouter();
  const { user } = useSelector(selectUser);
  const userLoading = useSelector(selectUserLoading);
  
  return (
    <>
      <div className="fixed top-16 w-56 text-right">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
              {userLoading ? (
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                  <span className="text-xs">loading ...</span>
                </div>
              ) : (
                <>
                  {user ? (
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                      <a
                        href="#"
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        Userpanel <span aria-hidden="true">&rarr;</span>
                      </a>
                    </div>
                  ) : (
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                      <Link
                        href="#"
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={(e)=>{e.preventDefault();  router.push('auth/login');  }}
                      >
                        Log in <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  )}
                </>
              )}
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          {user && <> 
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1 ">
              {links.map((link) => (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <EditInactiveIcon className="mr-2 h-5 w-5" />
                      ) : (
                        <EditInactiveIcon className="mr-2 h-5 w-5" />
                      )}
                     <Link key={link.label} href={link.href} className="text-sm font-semibold leading-6 text-gray-900" onClick={async(e)=>{e.preventDefault();  await removeLoginToken(); if(userMutate){await userMutate()} router.push('auth/login')  }} >
                     {link.label}
                      </Link>
                    </button>
                  )}
                </Menu.Item>
              ))}
              </div>

              <div className="px-1 py-1">
              {links.map((link) => (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <DeleteActiveIcon
                          className="mr-2 h-5 w-5 text-violet-400"
                          aria-hidden="true"
                        />
                      ) : (
                        <DeleteActiveIcon
                          className="mr-2 h-5 w-5 text-violet-400"
                          aria-hidden="true"
                        />
                      )}
                       {link.label}
                    </button>
                  )}
                </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
          </>
        }
        </Menu>
      </div>
    </>
  );
}

