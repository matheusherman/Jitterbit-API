const repository = require('../../src/repository/orderRepository');
const db = require('../../src/database/db');

jest.mock('../../src/database/db');

beforeEach(() => {
    jest.clearAllMocks();
});

test('create should insert order and items in a transaction', async () => {

    const order = {
        orderId: 'v10089015vdb',
        value: 10000,
        creationDate: new Date('2023-07-19T12:24:11.529Z'),
        items: [
            { productId: 2434, quantity: 1, price: 1000 },
            { productId: 9876, quantity: 2, price: 500 }
        ]
    };

    db.query.mockResolvedValue({});

    const result = await repository.create(order);

    expect(result).toEqual(order);
    expect(db.query).toHaveBeenNthCalledWith(1, 'BEGIN');
    expect(db.query).toHaveBeenNthCalledWith(
        2,
        'INSERT INTO orders (orderId,value,creationDate) VALUES ($1,$2,$3)',
        [order.orderId, order.value, order.creationDate]
    );
    expect(db.query).toHaveBeenNthCalledWith(
        3,
        'INSERT INTO items (orderId, productId, quantity, price) VALUES ($1, $2, $3, $4)',
        [order.orderId, 2434, 1, 1000]
    );
    expect(db.query).toHaveBeenNthCalledWith(
        4,
        'INSERT INTO items (orderId, productId, quantity, price) VALUES ($1, $2, $3, $4)',
        [order.orderId, 9876, 2, 500]
    );
    expect(db.query).toHaveBeenNthCalledWith(5, 'COMMIT');
});

test('create should rollback when insert fails', async () => {

    const order = {
        orderId: 'v10089015vdb',
        value: 10000,
        creationDate: new Date('2023-07-19T12:24:11.529Z'),
        items: [{ productId: 2434, quantity: 1, price: 1000 }]
    };

    db.query
        .mockResolvedValueOnce({})
        .mockRejectedValueOnce(new Error('insert order failed'))
        .mockResolvedValueOnce({});

    await expect(repository.create(order)).rejects.toThrow('insert order failed');
    expect(db.query).toHaveBeenNthCalledWith(1, 'BEGIN');
    expect(db.query).toHaveBeenNthCalledWith(3, 'ROLLBACK');
});

test('getOrder should return order', async () => {

    const order = { orderId: 1 };

    db.query.mockResolvedValue({
        rows: [order]
    });

    const result = await repository.getOrder(1);

    expect(result).toEqual(order);
});