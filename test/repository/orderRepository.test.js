const repository = require('../../src/repository/orderRepository');
const db = require('../../src/database/db');

jest.mock('../../src/database/db');

test('getOrder should return order', async () => {

    const order = { orderId: 1 };

    db.query.mockResolvedValue({
        rows: [order]
    });

    const result = await repository.getOrder(1);

    expect(result).toEqual(order);
});