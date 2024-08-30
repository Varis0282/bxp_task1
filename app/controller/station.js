import { successObj, errorObj } from '../../settings.js';
import StationModel from '../model/station.js';
import _ from 'lodash';

const StationController = {
    add: (data) => {
        return new Promise(async (resolve) => {
            try {
                let station = new StationModel();
                _.each(data, (value, key) => {
                    station[key] = value;
                });
                await station.save();
                resolve({ ...successObj, data: station, message: "Station added successfully" });
            } catch (error) {
                console.log("Error in StationController.add", error);
                resolve({ ...errorObj, data: null, message: error.message });
            }
        });
    },
    list: (data) => {
        return new Promise(async (resolve) => {
            try {
                const stations = await StationModel.find();
                resolve({ ...successObj, data: stations, message: "Station list" });
            } catch (error) {
                console.log("Error in StationController.list", error);
                resolve({ ...errorObj, data: null, message: error.message });
            }
        });
    },
    update: (data) => {
        return new Promise(async (resolve) => {
            try {
                if (!data._id) {
                    resolve({ ...errorObj, data: null, message: "Station id is required" });
                    return;
                }
                const station = await StationModel.findById(data._id);
                if (!station) {
                    resolve({ ...errorObj, data: null, message: "Station not found" });
                    return;
                }
                _.each(data, (value, key) => {
                    station[key] = value;
                });
                await station.save();
                resolve({ ...successObj, data: station, message: "Station updated successfully" });
            } catch (error) {
                console.log("Error in StationController.update", error);
                resolve({ ...errorObj, data: null, message: error.message });
            }
        });
    }
}

export default StationController;