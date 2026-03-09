const db = require('../database/db');

async function create(order) {
    const { orderId, value, creationDate } = order;
    const items = order.items || [];

    try {
        await db.query('BEGIN');

        await db.query(
            'INSERT INTO orders (orderId,value,creationDate) VALUES ($1,$2,$3)',
            [orderId, value, creationDate]
        );

        for (const item of items) {
            await db.query(
                'INSERT INTO items (orderId, productId, quantity, price) VALUES ($1, $2, $3, $4)',
                [orderId, item.productId, item.quantity, item.price]
            );
        }

        await db.query('COMMIT');
    } catch (error) {
        await db.query('ROLLBACK');
        throw error;
    }

    return order;
}

async function getOrder(id) {
    const result = await db.query(
        'SELECT * FROM orders WHERE orderId = $1',
        [id]
    );

    return result.rows[0] || null;
}

async function getAll() {
    const result = await db.query('SELECT * FROM orders');

    return result.rows;
}

async function patchOrder(id, data) {
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

    if (fields.length === 0) {
        return null;
    }

    values.push(id);

    const result = await db.query(
        `UPDATE orders SET ${fields.join(', ')} WHERE orderId = $${index} RETURNING *`,
        values
    );

    return result.rows[0] || null;
}

async function putOrder(id, data) {
    const { value, creationDate } = data;

    const result = await db.query(
        'UPDATE orders SET value = $1, creationDate = $2 WHERE orderId = $3 RETURNING *',
        [value, creationDate, id]
    );

    return result.rows[0] || null;
}

async function deleteOrder(id) {
    const result = await db.query(
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