import TicketCtrl from '../controller/ticket.js';

export default (app) => {
    app.post('/ticket/add', async (req, res) => {
        const response = await TicketCtrl.add(req.body);
        res.send(response);
    });
    app.post('/ticket/list', async (req, res) => {
        const response = await TicketCtrl.list(req.body);
        res.send(response);
    });
    app.put('/ticket/entry', async (req, res) => {
        const response = await TicketCtrl.entry(req.body);
        res.send(response);
    });
    app.put('/ticket/exit', async (req, res) => {
        const response = await TicketCtrl.exit(req.body);
        res.send(response);
    });
    app.post('/ticket/price', async (req, res) => {
        const { body } = req;
        const response = await TicketCtrl.price_Between(body);
        res.send(response);
    });
};