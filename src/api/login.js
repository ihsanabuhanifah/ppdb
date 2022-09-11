import axios from "./axios"

export function login(values){
    console.log(values)
    return axios.post('/login', values)
}

export function authMeProcess(){
    return axios.get('/authme')
}

export function resetPassword(email){
    return axios.get(`/resetpassword/${email}`)
}

export function changePassword(id, token, payload){
    return axios.post(`/changepassword/${id}/${token}`, payload)
}