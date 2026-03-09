const orderController = require('../../src/controller/orderController');
const orderService = require('../../src/service/orderService');

jest.mock('../../src/service/orderService');

describe('Order Controller', () => {

    test('createOrder should return 201', async () => {

        const req = {
            body: { numeroPedido: 1 }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const order = { orderId: 1 };

        orderService.create.mockResolvedValue(order);

        await orderController.createOrder(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ data: order });
    });

    test('deleteOrder should return 204', async () => {

        const req = {
            params: { id: 1 }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        orderService.deleteOrder.mockResolvedValue(true);

        await orderController.deleteOrder(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });

});