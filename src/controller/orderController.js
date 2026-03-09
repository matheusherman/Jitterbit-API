const orderService = require('../service/orderService');

async function createOrder(req, res, next) {
    try {
        const order = await orderService.create(req.body);
        res.status(201).json({ data: order });
    } catch (err) {
        next(err);
    }
}

async function getOrder(req, res, next) {
    try {
        const order = await orderService.getOrder(req.params.id);
        res.json({ data: order });
    } catch (err) {
        next(err);
    }
}

async function getAllOrders(req, res, next) {
    try {
        const orders = await orderService.getAll();
        res.json({ data: orders });
    } catch (err) {
        next(err);
    }
}

async function patchOrder(req, res, next) {
    try {
        const order = await orderService.patchOrder(req.params.id, req.body);
        res.json({ data: order });
    } catch (err) {
        next(err);
    }
}

async function putOrder(req, res, next) {
    try {
        const order = await orderService.putOrder(req.params.id, req.body);
        res.json({ data: order });
    } catch (err) {
        next(err);
    }
}

async function deleteOrder(req, res, next) {
    try {
        await orderService.deleteOrder(req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createOrder,
    getOrder,
    getAllOrders,
    patchOrder,
    putOrder,
    deleteOrder
};