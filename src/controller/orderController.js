const orderService = require('../service/orderService');

function createOrder(req, res) {
    orderService.create(req.body);
    res.json({ message: 'Order created' });
}

function getOrder(req, res) {
    const order = orderService.getOrder(Number(req.params.id));
    
    if (!order) {
        return res.status(404).json({
            message: 'Order not found'
        });
    }

    res.json({ message: 'Order details', order });
}
    
function getAllOrders(req, res) {
    const orders = orderService.getAll();
    res.json({ message: 'List of all orders', orders });
}

function updateOrder(req, res) {
    orderService.updateOrder(Number(req.params.id), req.body); // Number so pra padronizar no teste
    res.json({ message: 'Order updated' });
}

function deleteOrder(req, res) {
    const success = orderService.deleteOrder(Number(req.params.id));

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
    updateOrder,
    deleteOrder
};