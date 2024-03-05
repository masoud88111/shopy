
import { cookies } from 'next/headers'
import ProductsList from "@/components/products/productsList";

interface Props {
    searchParams : {
        page : string | undefined,
        per_page : string | undefined
    }
}


export const getProductsList = async ({ page , per_page } : { page : string , per_page : string }) => {
    let res = await fetch(`http://localhost:5000/api/products?page=${page}&per_page=${per_page}`)

    if( ! res.ok) {
        throw new Error('something goes wrong');
    }

    return res.json();
}


export default async function ProductsPage({ searchParams : { page , per_page } } : Props) {
    let productsListData = await getProductsList({ page : page ?? '1' , per_page : per_page ?? '1'});

    return (
        <div className="py-10">
            <h1 className="text-xl font-bold mb-6">Products</h1>
            <ProductsList productsListData={productsListData} />
        </div>
    )
}