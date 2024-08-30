import axios from 'axios';
import { baseURL } from './baseURL';

export const getStations = async () => {
    const { data } = await axios.post(`${baseURL}/station/list`)
    let stations = data;
    return stations;
}

