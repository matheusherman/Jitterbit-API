const orderService = require('../../src/service/orderService');
const repository = require('../../src/repository/orderRepository');
const NotFoundError = require('../../src/error/NotFoundError');

jest.mock('../../src/repository/orderRepository');

describe('Order Service', () => {

    test('should return order when order exists', async () => {

        const order = { orderId: 1 };

        repository.getOrder.mockResolvedValue(order);

        const result = await orderService.getOrder(1);

        expect(result).toEqual(order);
        expect(repository.getOrder).toHaveBeenCalledWith(1);
    });

    test('should throw NotFoundError when order does not exist', async () => {

        repository.getOrder.mockResolvedValue(null);

        await expect(orderService.getOrder(1))
            .rejects
            .toThrow(NotFoundError);
    });

    test('should update order', async () => {

        const updated = { orderId: 1, value: 200 };

        repository.patchOrder.mockResolvedValue(updated);

        const result = await orderService.patchOrder(1, { value: 200 });

        expect(result).toEqual(updated);
    });

    test('should throw NotFoundError if order does not exist', async () => {

        repository.patchOrder.mockResolvedValue(null);

        await expect(
            orderService.patchOrder(1, { value: 200 })
        ).rejects.toThrow(NotFoundError);
    });

});