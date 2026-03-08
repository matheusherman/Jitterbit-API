const db = require('../database/db');

function create(order) {

    const { orderId, value, creationDate } = order;

    db.query(
        'INSERT INTO orders (orderId,value,creationDate) VALUES ($1,$2,$3)',
        [orderId, value, creationDate]
    );

    return order;
}

function getOrder(id) {
    const result = db.query(
        'SELECT * FROM orders WHERE orderId = $1',
        [id]
    );

    return result.rows[0] || null;
}

function getAll() {
    const result = db.query('SELECT * FROM orders');
    return result.rows;
}

function patchOrder(id, data) {

    const fields = [];
    const values = [];
    let index = 1;

    if (data.value !== undefined) {
        fields.push(`value = $${index++}`);
        values.push(data.value);
    }

    if (data.creationDate !== undefined) {
        fields.push(`creationDate = $${index++}`);
        values.push(data.creationDate);
    }

    values.push(id);

    const result = db.query(
        `UPDATE orders SET ${fields.join(', ')} WHERE orderId = $${index} RETURNING *`,
        values
    );

    return result.rows[0] || null;
}

function putOrder(id, data) {
    const { value, creationDate } = data;

    db.query(
        'UPDATE orders SET value = $1, creationDate = $2 WHERE orderId = $3',
        [value, creationDate, id]
    );

    return result.rows[0] || null;
}

function deleteOrder(id) {
    const result  = db.query(
        'DELETE FROM orders WHERE orderId = $1',
        [id]
    );

    return result.rowCount > 0;
}   

module.exports = {
    create,
    getOrder,
    getAll,
    patchOrder,
    putOrder,
    deleteOrder
};