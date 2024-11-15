const DataService = require('../../services/data.svc')
const request = require('supertest')
const app = require('../../bin/server')

let dataService

beforeAll(async () => {
  dataService = new DataService('movies')
})

afterAll(async () => {
  await app.close()
})

describe("GET /prizes/mim-max-prizes", () => {
  it("Deve retornar o maior e o menor intervalo", async () => {
    await dataService.loadDB()
    const res = await request(app)
      .get("/prizes/mim-max-prizes")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      "min": [
        {
          "producer": "Joel Silver",
          "interval": 1,
          "previousWin": 1990,
          "followingWin": 1991
        }
      ],
      "max": [
        {
          "producer": "Matthew Vaughn",
          "interval": 13,
          "previousWin": 2002,
          "followingWin": 2015
        }
      ]
    });
  });
});
