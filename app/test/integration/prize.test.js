const request = require('supertest');
const app = require('../../app');

describe('GET /prizes/mim-max-prizes', () => {
    it('Deve retornar o maior e o menor intervalo', async () => {
        const res = await request(app)
            .get('/prizes/mim-max-prizes')
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(200);

        expect(res.body).toHaveProperty('min');
        expect(res.body.min).toBeInstanceOf(Array);

        expect(res.body).toHaveProperty('max');
        expect(res.body.max).toBeInstanceOf(Array);
    });
});
