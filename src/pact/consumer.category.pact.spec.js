const { Pact } = require ('@pact-foundation/pact');
const { CategoryApiClient } = require ('../api/api_pact');
const { Category } = require ('../model/Category');
const { like, regex } = require ('@pact-foundation/pact/dsl/matchers');
const chai = require("chai")
const expect = chai.expect

const mockProvider = new Pact({
    consumer: 'gatling-consumer',
    provider: 'gatling-provider',
    cors: true
});

describe('Category API test', () => {
    beforeEach(() => mockProvider.setup());
    afterEach(() => mockProvider.verify());
    afterEach(() => mockProvider.finalize());

    it('get category by ID', async () => {
        const expectedCategory = { id: 'cdb02322-a8a6-4acf-9644-ddf8b24af9e6', title: 'My another category' }

        await mockProvider.addInteraction({
            state: 'a category with ID cdb02322-a8a6-4acf-9644-ddf8b24af9e6 exists',
            uponReceiving: 'a request to get a category',
            withRequest: {
                method: 'GET',
                path: '/category/cdb02322-a8a6-4acf-9644-ddf8b24af9e6'
            },
            willRespondWith: {
                status: 200,
                headers: {
                    'Content-Type': regex({generate: 'application/json', matcher: '^application\/json.*'}),
                },
                body: like(expectedCategory),
            },
        });

        const api = new CategoryApiClient(mockProvider.mockService.baseUrl);
        const category = await api.getCategory("cdb02322-a8a6-4acf-9644-ddf8b24af9e6");

        expect(category).to.deep.equal(new Category('cdb02322-a8a6-4acf-9644-ddf8b24af9e6', 'My another category'));
    });
});