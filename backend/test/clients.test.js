import * as chai from 'chai';
import supertest from 'supertest';
import dotenv from 'dotenv';
import { clearDB } from '../src/database/connection.js'
import { app, server } from '../src/app.js';
import { Clients } from '../src/Components/Clients/clientsModels.js';

dotenv.config();

const expect = chai.expect;
const requester = supertest(app);

describe('Clients Tests', function(){

    before(async () => {
        await clearDB();

        const userMock = {
            mail_client: 'testPrev@gmail.com',
            name_client: 'testPrev',
            last_name_client: 'testPrev',
            dni_client: '12345672',
            province_client: 'Catamarca',
            direction_client: 'Calle test 1232',
            phone_number_client: '03415432',
            type_client: 'Consumidor Final',
            cuil_or_cuit_client: '12123456721'
        };

        await Clients.create(userMock)
    });

    after(async () => {
        server.close(() => console.log('El server cerró correctamente'));
    })

    describe('Get clients', () => {
        it('EP: /clients/ should return the list of clients.', async () => {
            const response = await requester.get('/clients/');
            expect(response.status).to.be.equal(200);
        });
    });

    describe('Get one or more clients with the requested parameters', () => {
        it('EP: /clients/search', async () => {
            const response = await requester.get('/clients/search?search_type=name_client&search_value=test')
            expect(response.status).to.be.equal(200)
        })
    })

    describe('Creates a new client on the DB', () => {
        const userMock = {
            mail_client: 'test@gmail.com',
            name_client: 'test',
            last_name_client: 'test',
            dni_client: '12345677',
            province_client: 'Catamarca',
            direction_client: 'Calle test 1232',
            phone_number_client: '03415432',
            type_client: 'Consumidor Final',
            cuil_or_cuit_client: '12123456771'
        };
        it('EP: /clients/create should create a client and return status 201', async () => {
            const response = await requester.post('/clients/create').send(userMock);
            expect(response.status).to.be.equal(201);
        });

        it('EP: /clients/create should fail to create a client and return status 400', async () => {
            const response = await requester.post('/clients/create').send(userMock);
            expect(response.status).to.be.equal(400);
        });
    });

    describe('Logical Delete of a client', () => {
        const clientToDelete = {
            dni_client: 12345677
        }
        const nonExistentClient = {
        dni_client: 12453678
        }
    
        it('EP: /clients/disabled/:dni_client should set the "disabled" field to 1', async () => {
            const response = await requester.patch('/clients/disabled/12345677').send(clientToDelete)
            expect(response.status).to.be.equal(200)
        })
    
        it('EP: /clients/disabled/:dni_client should return 404 for non-existent client', async () => {
            const response = await requester.patch('/clients/disabled/12453678').send(nonExistentClient)
            expect(response.status).to.be.equal(404)
            
            expect(response.body).to.equal('DNI no encontrado') 
        })
    })
    
    describe('Update a client', () => {
        it('EP: /clients/update/:dni_client should update one or more fields of the client (PATCH)', async () => {
            const userMock = {
                "name_client": "update",
                "last_name_client": "update",
                "mail_client": "test@gmail.com",
                "province_client": "Catamarca",
                "direction_client": "Calle test 1232",
                "phone_number_client": "03415432",
                "type_client": "Consumidor Final",
                "cuil_or_cuit_client": "12345678901"
            }
            const response = await requester.patch('/clients/update/12345677').send(userMock)
            
            expect(response.status).to.be.equal(200)
        })
    })

});