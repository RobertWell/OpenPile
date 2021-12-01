import axios from "axios"

export const request = axios
const product_route='/api/products'
export const productApi ={
    new:()=>`${product_route}/`,
    update:(id)=>`${product_route}/${id}`,
    show:(id)=>`${product_route}/${id}`,
    delete:(id)=>`${product_route}/${id}`,
    get:()=>`${product_route}/`,
    show_all:()=>`${product_route}/all`,
    show_by_tags:(tag)=>`${product_route}/show-by-tags/${tag}`,
}



export const ingressRequest = axios.create({
    // baseURL:'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/'
    baseURL:'http://ingress-nginx.ingress-nginx-controller.svc.cluster.local/'
  })