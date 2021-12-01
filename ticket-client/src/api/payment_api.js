import axios from "axios"

export const request = axios
const payment_route='/api/payments'
export const paymentApi ={
    new:()=>`${payment_route}/`,
}



export const ingressRequest = axios.create({
    // baseURL:'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/'
    baseURL:'http://ingress-nginx.ingress-nginx-controller.svc.cluster.local/'
  })