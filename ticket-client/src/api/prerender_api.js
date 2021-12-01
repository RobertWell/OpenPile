import axios from "axios"

export const request = axios
const prerender_route='/api/prerender'
export const prerenderApi ={
    update:(id)=>`${prerender_route}/update/${id}`,
    get:()=>`${prerender_route}/`,
}



export const ingressRequest = axios.create({
    // baseURL:'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/'
    baseURL:'http://ingress-nginx.ingress-nginx-controller.svc.cluster.local/'
  })