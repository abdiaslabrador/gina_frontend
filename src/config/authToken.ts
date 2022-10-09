import customAxios from './axios'

const authToken = (token: string | null)  => {
    if(token){
        customAxios.defaults.headers.common["authorization"]= "Bearer " + token
    }
    else{
        delete customAxios.defaults.headers.common["authorization"]
    }
}

export default authToken