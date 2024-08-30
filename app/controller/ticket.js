import TicketModel from '../model/ticket.js';
import _ from 'lodash';
import StationController from './station.js';
import { errorObj, successObj } from '../../settings.js';

const TicketController = {
    add: (data) => {
        return new Promise(async (resolve) => {
            try {
                const ticket = new TicketModel();
                _.each(data, (value, key) => {
                    ticket[key] = value;
                });
                // after 18 hours ticket will be expired
                ticket.expiryTime = new Date(new Date().getTime() + 18 * 60 * 60 * 1000);

                await ticket.save();
                resolve({ ...successObj, data: ticket, message: "Ticket added successfully" });
            } catch (error) {
                console.log("Error in TicketController.add", error);
                resolve({ ...errorObj, data: null, message: error.message });
            }
        });
    },
    list: (data) => {
        return new Promise(async (resolve) => {
            try {
                const tickets = await TicketModel.find();
                resolve({ ...successObj, data: tickets, message: "Ticket list" });
            } catch (error) {
                console.log("Error in TicketController.list", error);
                resolve({ ...errorObj, data: null, message: error.message });
            }
        });
    },
    entry: (data) => {
        return new Promise(async (resolve) => {
            try {
                if (!data._id) {
                    resolve({ ...errorObj, data: null, message: "Ticket id is required" });
                    return;
                }
                const ticket = await TicketModel.findById(data._id);
                if (!ticket) {
                    resolve({ ...errorObj, data: null, message: "Ticket not found" });
                    return;
                }
                if (new Date() > ticket.expiryTime || ticket.expired) {
                    resolve({ ...errorObj, data: null, message: "Ticket expired" });
                    return;
                }
                if (ticket.entry) {
                    resolve({ ...errorObj, data: null, message: "Ticket already entered" });
                    return;
                }
                ticket.entry = true;
                ticket.entryTime = new Date();
                await ticket.save();
                resolve({ ...successObj, data: ticket, message: "Ticket entry success" });
            } catch (error) {
                console.log("Error in TicketController.entry", error);
                resolve({ ...errorObj, data: null, message: error.message });
            }
        });
    },
    exit: (data) => {
        return new Promise(async (resolve) => {
            try {
                if (!data._id) {
                    resolve({ ...errorObj, data: null, message: "Ticket id is required" });
                    return;
                }
                const ticket = await TicketModel.findById(data._id);
                if (!ticket) {
                    resolve({ ...errorObj, data: null, message: "Ticket not found" });
                    return;
                }
                if (new Date() > ticket.expiryTime || ticket.expired) {
                    resolve({ ...errorObj, data: null, message: "Ticket expired" });
                    return;
                }
                if (!ticket.entry) {
                    resolve({ ...errorObj, data: null, message: "Ticket not entered" });
                    return;
                }
                if (ticket.exit) {
                    resolve({ ...errorObj, data: null, message: "Ticket already exited" });
                    return;
                }
                ticket.exit = true;
                ticket.exitTime = new Date();
                ticket.expired = true;
                await ticket.save();
                resolve({ ...successObj, data: ticket, message: "Ticket exit success" });
            } catch (error) {
                console.log("Error in TicketController.exit", error);
                resolve({ ...errorObj, data: null, message: error.message });
            }
        });
    },
    price_Between: (data) => {
        return new Promise(async (resolve) => {
            try {
                if (!data.startStaion || !data.endStation) {
                    resolve({ ...errorObj, data: null, message: "Start and end station are required" });
                    return;
                }
                if (data.startStaion === data.endStation) {
                    resolve({ ...successObj, data: 0, message: "Price is 0" });
                    return;
                }
                const { data: stations } = await StationController.list({});
                const startStation = stations.find(station => station.name === data.startStaion);
                const endStation = stations.find(station => station.name === data.endStation);
                if (!startStation || !endStation) {
                    resolve({ ...errorObj, data: null, message: "Start or end station not found" });
                    return;
                }
                let price = endStation.price - startStation.price;
                if (price < 0) {
                    price = price * -1;
                }
                resolve({ ...successObj, data: price, message: "Price calculated" });
            } catch (error) {
                console.log("Error in TicketController.price_Between", error);
                resolve({ ...errorObj, data: null, message: error.message });
            }
        });
    }
}

export default TicketController;