import { Router } from "express";
import { productsController } from "./productsController.js";
import { productValidator } from "./productsValidators.js";
const ProductsController = new productsController();
let productsRouter = Router();

productsRouter.get('/', ProductsController.verTodos);
productsRouter.get('/create', ProductsController.irAPaginaCrear);
productsRouter.post('/create', productValidator.createProduct,ProductsController.crear);
productsRouter.get('/delete/:id_product', ProductsController.eliminar);
productsRouter.get('/update/:id_product', ProductsController.irPaginaActualizar);
productsRouter.post('/update/:id_product', productValidator.updateProduct, ProductsController.actualizar);
productsRouter.get('/search/', productValidator.searchProduct, ProductsController.filtrarBusqueda);

export default productsRouter;