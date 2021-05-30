const router = require('../routes/personRoutes').default
const db = require('../db/setConnectTest').default
const app = require('../app').default
const supertest = require('supertest');
const request = supertest(app)
app.use(router)


it('creates a new person object', async () => {
    await request.post('')
    .send({
        "firstName": "Alex",
        "middleName": "smith",
        "lastName": "Frank",
        "email": "1gmail.com",
        "age": 19
}).expect(201)
})

it('reads all person objects', async () => {
    await request.get('').expect(200)
})

it('read one person object with latest version', async () => {
    await request.get('/148df625-a771-4c9e-a450-7811f4aa449f').expect(200)
})

it('read person object with specified version', async () => {
    await request.get('/e31f009e-968c-4a7e-95b4-da55022b693f/2').expect(200)
})

it('update latest person object', async () => {
    await request.put('/e31f009e-968c-4a7e-95b4-da55022b693f').send({
        "firstName": "David",
        "middleName": "",
        "lastName": "Blane",
        "email": "something@yahoo.com",
        "age": 89
}).expect(200)
})

it('delete latest person object', async () => {
    await request.delete('/d6b8e01d-b5c3-4596-8989-2619aed139ab').expect(200)
})