import { Router } from "express";
import { orderController } from "./ordersController.js";
import { ordersValidator } from "./ordersValidators.js";
let ordersRouter = Router();
const OrderController = new orderController();

ordersRouter.get('/', OrderController.verPedidos);
ordersRouter.get('/create', OrderController.irPaginaCrear);
ordersRouter.post('/create', ordersValidator.createOrUpdateOrder,OrderController.crear);
ordersRouter.patch('/disabled/:id_order', OrderController.deshabilitar);
ordersRouter.delete('/delete/:id_order', OrderController.borrar);
ordersRouter.get('/update/:id_order', OrderController.irPaginaActualizar);
ordersRouter.patch('/update/:id_order', ordersValidator.createOrUpdateOrder,OrderController.actualizar);
ordersRouter.get('/search', ordersValidator.searchOrder,OrderController.filtrar);

export default ordersRouter;