const orderService = require('../service/orderService');

async function createOrder(req, res) {
    const order = await orderService.create(req.body);
    res.status(201).json(order);
}

async function getOrder(req, res) {
    const order = await orderService.getOrder(req.params.id);
    
    if (!order) {
        return res.status(404).json({
            message: 'Order not found'
        });
    }

    res.json(order);
}

async function getAllOrders(req, res) {
    const orders = await orderService.getAll();

    res.json({
        message: 'List of all orders',
        orders
    });
}

async function patchOrder(req, res) {
    const order = await orderService.patchOrder(req.params.id, req.body);

    if (!order) {
        return res.status(404).json({
            message: 'Order not found'
        });
    }

    res.json(order);
}

async function putOrder(req, res) {
    const order = await orderService.putOrder(req.params.id, req.body);

    if (!order) {
        return res.status(404).json({
            message: 'Order not found'
        });
    }

    res.json(order);
}

async function deleteOrder(req, res) {
    const success = await orderService.deleteOrder(req.params.id);

    if (!success) {
        return res.status(404).json({
            message: "Order not found"
        });
    }

    res.status(204).send();
}

module.exports = {
    createOrder,
    getOrder,
    getAllOrders,
    patchOrder,
    putOrder,
    deleteOrder
};