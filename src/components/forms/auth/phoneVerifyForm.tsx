import { withFormik } from "formik";
import * as yup from "yup";
import InnerPhoneVerify from "@/components/auth/innerPhoneVerifyForm";
import { PhoneVerifyFormValuesInterface } from "@/contracts/auth";

import ValidationError from "@/exceptions/validationError";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { sendToApi } from "@/helpers/api";
import { KeyedMutator } from 'swr';
import { storeLoginToken } from "@/helpers/auth";


const phoneVerifyFormValidationSchema = yup.object().shape({
    code : yup.string().required().matches(/^[0-9]+$/,"فقط میتوانید عدد وارد کنید").length(6)
})

interface PhoneVerifyFormProps {
    token? : string,
    clearToken : () => void,
    userMutate? : KeyedMutator<any>
    router : AppRouterInstance
}

const PhoneVerifyForm = withFormik<PhoneVerifyFormProps , PhoneVerifyFormValuesInterface>({
    mapPropsToValues : props => ({
        code : '',
        token : props.token || ""
    }),
    validationSchema: phoneVerifyFormValidationSchema,
    handleSubmit : async (values , { props , setFieldError }) => {
        try {
            const res = await sendToApi({
                url : "auth/login/verify-phone",
                options : {
                    body : JSON.stringify(values)
                }
            })

           if(res.ok) {
                let data = await res.json();
                // clear phon verify token from redux
                await storeLoginToken(data?.user?.token);
                if( props.userMutate ) {
                    await props.userMutate();
                }
                props.router.push('/panel');
                props.clearToken();
           }
        } catch (error) {
            if(error instanceof ValidationError) {
                Object.entries(error.messages).forEach( ( [key , value] ) => setFieldError(key , value as string))
            }

            console.log(error)
        }

    }
})(InnerPhoneVerify)

export default PhoneVerifyForm;