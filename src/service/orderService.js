const Order = require('../model/order');

const orders = []

function create(data) {
    const { orderId, value, creationDate } = data;

    const order = new Order(orderId, value, creationDate);
    orders.push(order);

    return order;
}

function getOrder(id) {
    return orders.find(order => order.orderId === id);
}

function getAll() {
    return orders;
}

function updateOrder(id, data) {
    const order = getOrder(id);

    if (!order) {
        return null;
    }

    const { value, creationDate } = data;

    if (value !== undefined) {
        order.value = value;
    }

    if (creationDate !== undefined) {
        order.creationDate = creationDate;
    }

    return order;
}

function deleteOrder(id) {
    const index = orders.findIndex(order => order.orderId === id);

    if (index === -1) {
        return false;
    }

    orders.splice(index, 1);
    return true;
}


module.exports = {
    create,
    getOrder,
    getAll,
    updateOrder,
    deleteOrder
};
