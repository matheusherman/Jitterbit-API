const orderService = require('../service/orderService');

function createOrder(req, res) {
    orderService.create(req.body);
    res.json({ message: 'Order created' }); // retorna 200 independente
}

function getOrder(req, res) {
    const order = orderService.getOrder(req.params.id);
    
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

function patchOrder(req, res) {
    orderService.updateOrder(req.params.id, req.body); 
    res.json({ message: 'Order updated' });
}

function putOrder(req, res) {
    orderService.updateOrder(req.params.id, req.body);
    res.json({ message: 'Order updated' });
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