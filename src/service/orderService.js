const repository = require('../repository/orderRepository');

async function create(data) {
    const order = mapOrder(data);
    return await repository.create(order);
}

async function getOrder(id) {
    return await repository.getOrder(id);
}

async function getAll() {
    return await repository.getAll();
}

async function patchOrder(id, data) {
    const order = await repository.getOrder(id);

    if (!order) {
        return null;
    }

    return await repository.patchOrder(id, data);
}

async function putOrder(id, data) {
    const order = await repository.getOrder(id);

    if (!order) {
        return null;
    }

    return await repository.putOrder(id, data);
}

async function deleteOrder(id) {
    return await repository.deleteOrder(id);
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