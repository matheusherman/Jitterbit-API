const repository = require('../repository/orderRepository');
const NotFoundError = require('../error/NotFoundError');

async function create(data) {
    const order = mapOrder(data);
    return repository.create(order);
}

async function getOrder(id) {
    const order = await repository.getOrder(id);

    if (!order) {
        throw new NotFoundError('Order not found');
    }

    return order;
}

async function getAll() {
    return repository.getAll();
}

async function patchOrder(id, data) {
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError('No fields provided for update');
    }

    const order = await repository.patchOrder(id, data);

    if (!order) {
        throw new NotFoundError('Order not found');
    }

    return order;
}

async function putOrder(id, data) {
    if (data.value === undefined || data.creationDate === undefined) {
        throw new BadRequestError('value and creationDate are required');
    }

    const order = await repository.putOrder(id, data);

    if (!order) {
        throw new NotFoundError('Order not found');
    }

    return order;
}

async function deleteOrder(id) {
    const success = await repository.deleteOrder(id);

    if (!success) {
        throw new NotFoundError('Order not found');
    }

    return true;
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