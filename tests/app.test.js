const request = require('supertest')
const crawler = require('../services/crawler')
const app = require('../app')
const data = require('./data');

jest.mock("../services/crawler")

describe('Web Crawler', () => {

    test('should get back 404 status - ', async () => {
        const response = await request(app)
        .get('/')

        expect(response.status).toBe(400)
    })

    test('should get back 400 status - when url is not absolute', async () => {
        const response = await request(app)
        .get('/')
        .query({url: 'topeomot.com'})

        expect(response.status).toBe(400)
        expect(response.text).toBe('send absolute url with protocol included')
    })
    
    test('should get back html content', async () => {
        crawler.getContent.mockResolvedValueOnce(Promise.resolve(data.content))
        const response = await request(app)
        .get('/')
        .query({url: data.url})
        
        expect(response.status).toBe(200)
        expect(response.body.data).toBe(data.content)
        
    })
    
})

