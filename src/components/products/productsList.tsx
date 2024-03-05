'use client';

import Link from "next/link";
import ReactCustomPaginate from "../shared/reactCutsomPaginate";

import { useEffect, useState } from "react";
import { getProductsList } from "@/app/products/page";
import { useQueryState } from "nuqs";



export default function ProductsList({ productsListData } : { productsListData : any}) {
    const [ productsList , setProductsList ] = useState(productsListData?.data ?? []);
    const [ page , setPage ] = useQueryState('page');
    const [ perPage , setPerPage ] = useQueryState('per_page');
    
    useEffect(() => {
        getProductsListByChangePage()
    } , [page , perPage])

    const onPageChangeHandler = ({ selected } : { selected : number }) => {
        setPage(String(selected + 1));
    }

    const getProductsListByChangePage = async () => {
        let productsData = await getProductsList({ page : page ?? '1', per_page : perPage ?? '1' })
        setProductsList(productsData?.data);
    } 

    return (
        <>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {productsList?.map((product : any) => (
                    <li
                        key={product.id}
                        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                    >
                    <div className="flex flex-1 flex-col items-start">
                        <img className="mx-auto h-32 w-full flex-shrink-0 rounded-t-md object-cover" src="https://dummyimage.com/400x350" alt="" />
                        <div className="p-6 text-start">
                            <h3 className="text-sm text-gray-900 font-bold">{product.title}</h3>
                            <dl className="mt-1 flex flex-grow flex-col justify-between">
                                <dd className="text-sm text-gray-500">{product.body.substring(0,100)}</dd>
                            </dl>
                        </div>
                    </div>
                    <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                            <div className="flex w-0 flex-1">
                                <Link
                                    href={`/products/${product?.id}`}
                                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:text-indigo-700"
                                >
                                    see product
                                </Link>
                            </div>
                        </div>
                    </div>
                    </li>
                ))}
            </ul>


            <ReactCustomPaginate pageCount={productsListData?.total_page} page={Number(page)} onPageChangeHandler={onPageChangeHandler} />
        </>
    )
}