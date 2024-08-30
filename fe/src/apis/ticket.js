import axios from 'axios';
import { baseURL } from './baseURL';

export const addTicket = async (body) => {
    const { data } = await axios.post(`${baseURL}/ticket/add`, body)
    let ticket = data;
    return ticket;
}


export const listTicket = async () => {
    const { data } = await axios.post(`${baseURL}/ticket/list`)
    let ticket = data;
    return ticket;
};

export const entryTicket = async (body) => {
    const { data } = await axios.put(`${baseURL}/ticket/entry`, body)
    let ticket = data;
    return ticket;
}

export const exitTicket = async (body) => {
    const { data } = await axios.put(`${baseURL}/ticket/exit`, body)
    let ticket = data;
    return ticket;
}

export const priceBetween = async (body) => {
    const { data } = await axios.post(`${baseURL}/ticket/price`, body)
    let ticket = data;
    return ticket;
}

