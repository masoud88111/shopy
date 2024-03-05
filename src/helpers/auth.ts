const storeLoginToken = async (token : string , days : number = 10) => {
    await fetch('/api/login' , {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ token })
    })
}


const removeLoginToken = async () => {
    await fetch('/api/logout' , {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        }
    })
}

export { storeLoginToken , removeLoginToken };

