import 'dotenv/config';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        failOnErrors: true,
        openapi: '3.0.0',
        info: {
            title: 'Wotech - Carpentry Manager',
            description: 'Una API para gestionar una carpintería',
            version: '1.0.0',
            contact: {
                name: 'Soporte de API',
                email: 'alejoviviani12@gmail.com'
            }
        },
        servers: [{
                url: `https://kind-crabs-flow.loca.lt`,
                description: 'Servidor de desarrollo'
            }],
    },
    apis: ['src/Components/Stock/stockRouter.js', 'src/Components/Tools/toolsRouter.js', 'src/Components/Suppliers/suppliersRouter.js', 'src/Components/Products/productsRouter.js', 'src/Components/SupplierMaterials/suppliersMaterialsRouter.js', 'src/Components/Purchase/purchasesRouter.js', 'src/Components/Orders/ordersRouter.js', 'src/Components/Invoices/invoicesRouter.js', 'src/Components/Clients/clientsRouter.js']
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDoc = (app) => {
    app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`Documentación de API disponible en https://kind-crabs-flow.loca.lt/api-doc`);
};

// , {
//     swaggerOptions: {
//     requestInterceptor: (req) => {
//         req.headers['ngrok-skip-browser-warning'] = true;
//         return req;
//     }
//     }
// }



