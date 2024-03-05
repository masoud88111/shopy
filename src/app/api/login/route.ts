import cookie from "cookie";

export async function POST(request : Request) {
    const req = await request.json();

    return new Response(JSON.stringify({ status: 'success' }) , {
        status : 200 ,
        headers : {
            "Set-Cookie" : cookie.serialize("shopy_token" , req?.token ,{
                httpOnly : true,
                maxAge : 60 * 60 * 24,
                sameSite : "lax",
                path: "/"
                // domain : '.'
                // secure : 
            })
        }
    })
}
