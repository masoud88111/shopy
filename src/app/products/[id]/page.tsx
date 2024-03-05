import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";


interface Props {
    params : {
        id : string
    }
}


const getSingleProduct = async (id : string) => {
    let res = await fetch(`http://localhost:5000/api/products/${id}`)

    if( ! res.ok) {
        throw new Error('something goes wrong');
    }

    return res.json();
}

export async function generateMetadata(
    { params } : Props,
    parent : ResolvingMetadata
) : Promise<Metadata> {
    let productData = await getSingleProduct(params.id);
    let product = productData?.product;

    return {
        title : product.title,
        description : product.body.substring(0,120)
    }
}

export default async function ProductSinglePage({ params : { id } } : Props) {
    let productData = await getSingleProduct(id);
    let product = productData?.product;


    return (
        <div>
            <Image
                src="https://static.roocket.ir/images/cover/2023/3/8/ERXQS7GHCGaTmzxa4x2Aa5upnKJ9lzPhjIt4FXnb.png"
                alt=""
                width={400}
                height={300}
            />
            <h2>{product?.title}</h2>
            <p>{product?.body}</p>
        </div>
    )
}