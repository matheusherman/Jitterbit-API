
function createOrder(req, res) {
    res.json({ message: 'Order created' });
}

function getOrder(req, res) {
    res.json({ message: 'Order details' });
}
    
function getAllOrders(req, res) {
    res.json({ message: 'List of all orders' });
}

function updateOrder(req, res) {
    res.json({ message: 'Order updated' });
}

function deleteOrder(req, res) {
    res.json({ message: 'Order deleted' });
}

module.exports = {
    createOrder,
    getOrder,
    getAllOrders,
    updateOrder,
    deleteOrder
};