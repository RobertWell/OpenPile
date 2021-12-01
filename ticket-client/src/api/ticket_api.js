import axios from "axios"

export const request = axios

const ticket_route='/api/tickets'
export const ticketApi ={
    new_ticket:()=>`${ticket_route}`,
    show_all_tickets:()=>`${ticket_route}`,
    check_ticket:(id)=>`${ticket_route}/${id}`,
    update_ticket:(id)=>`${ticket_route}/${id}`,
    delete_ticket:(id)=>`${ticket_route}/${id}`,
    batch_delete_tickets:()=>`${ticket_route}/batch_delete`,

}



export const ingressRequest = axios.create({
    // baseURL:'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/'
    baseURL:'http://ingress-nginx.ingress-nginx-controller.svc.cluster.local/'
  })