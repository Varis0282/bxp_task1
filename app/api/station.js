import StationCtrl from '../controller/station.js';

export default (app) => {
    app.post('/station/add', async (req, res) => {
        const { body } = req;
        const response = await StationCtrl.add(body);
        res.send(response);
    });
    app.post('/station/list', async (req, res) => {
        const response = await StationCtrl.list(req.body);
        res.send(response);
    });
    app.put('/station/update', async (req, res) => {
        const response = await StationCtrl.update(req.body);
        res.send(response);
    });
}