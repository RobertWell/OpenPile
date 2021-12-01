import axios from "axios"

export const request = axios
const user_route='/api/users'
export const authApi ={
    currentuser:()=>`${user_route}/currentuser`,
    signup:()=>`${user_route}/signup`,
    signin:()=>`${user_route}/signin`,
    signout:()=>`${user_route}/signout`,
    update:()=>`${user_route}/update`,
    change_password:()=>`${user_route}/change_password`,
}



export const ingressRequest = axios.create({
    // baseURL:'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/'
    baseURL:'http://ingress-nginx.ingress-nginx-controller.svc.cluster.local/'
  })