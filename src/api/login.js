import axios from "./axios"

export function login(values){
    console.log(values)
    return axios.post('/login', values)
}

export function authMeProcess(){
    return axios.get('/authme')
}