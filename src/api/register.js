import axios from "./axios"

export function register(values){
    console.log(values)
    return axios.post('/register', values)
}
export function registerbyAdmin(values){
    console.log(values)
    return axios.post('/register/admin', values)
}