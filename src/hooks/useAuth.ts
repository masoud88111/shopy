import useSWR from "swr";
import { fetcher } from "@/helpers/api";

const useAuth = () => {
    const { data : user , error , mutate } = useSWR('user_me' , async () => {
        let res = await fetcher({ 
            url : "/user",
            options : {
                credentials : "include"
            }
           
        });
        
        if(res.ok) {
            let data = await res.json();
            // console.log(user);
            return data?.user;
        }
       
        throw new Error('unAuthorized!')
    })
    

    return { user : user , error , loading : !user && !error , mutate }
}



export default useAuth;