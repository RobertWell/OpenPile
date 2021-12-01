import axios from "axios"

export const request = axios
const orders_route='/api/orders'
export const orderApi ={
    new:()=>`${orders_route}/`,
    delete:(id)=>`${orders_route}/${id}`,
    show:(id)=>`${orders_route}/${id}`,
    update:(id)=>`${orders_route}/${id}`,
    show_all:()=>`${orders_route}/`,
    show_complete:()=>`${orders_route}/complete`,
}



export const ingressRequest = axios.create({
    // baseURL:'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/'
    baseURL:'http://ingress-nginx.ingress-nginx-controller.svc.cluster.local/'
  })