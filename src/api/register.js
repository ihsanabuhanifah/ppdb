import axios from "./axios"

export function register(values){
    console.log(values)
    return axios.post('/register', values)
}