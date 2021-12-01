import axios from "axios";

export const request = axios;

const unsplash_route = "/api/ticketdetail";
export const unsplashApi = {
  search: () => `${unsplash_route}/search`,
  new: (id) => `${unsplash_route}/${id}`,
  get:()=>`${unsplash_route}`,
  batch: (Ids) => `${unsplash_route}/${Ids}`,
};

export const ingressRequest = axios.create({
  // baseURL:'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/'
  baseURL: "http://ingress-nginx.ingress-nginx-controller.svc.cluster.local/",
});
