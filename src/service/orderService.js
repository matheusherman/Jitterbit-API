const repository = require('../repository/orderRepository');

function create(data) {
    const order = mapOrder(data);
    return repository.create(order);
}

function getOrder(id) {
    return repository.getOrder(id);
}

function getAll() {
    return repository.getAll();
}

function patchOrder(id, data) {

    const order = repository.getOrder(id);

    if (!order) {
        return null;
    }

    return repository.patchOrder(id, data);
}

function putOrder(id, data) {

    const order = repository.getOrder(id);

    if (!order) {
        return null;
    }

    return repository.putOrder(id, data);
}

function deleteOrder(id) {
    return repository.deleteOrder(id);
}

function mapOrder(data) {

    return {
        orderId: data.numeroPedido,
        value: data.valorTotal,
        creationDate: new Date(data.dataCriacao),
        items: data.items.map(i => ({
            productId: Number(i.idItem),
            quantity: i.quantidadeItem,
            price: i.valorItem
        }))
    };
}


module.exports = {
    create,
    getOrder,
    getAll,
    patchOrder,
    putOrder,
    deleteOrder
};
