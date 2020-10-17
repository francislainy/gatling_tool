// (1) Import the pact library and matching methods
const { Pact } = require ('@pact-foundation/pact');
const { CategoryApiClient } = require ('../api/api_pact');
const { Category } = require ('../model/Category');
const { like, regex } = require ('@pact-foundation/pact/dsl/matchers');
const chai = require("chai")
const expect = chai.expect

// (2) Configure our Pact library
const mockProvider = new Pact({
    consumer: 'category-consumer',
    provider: 'category-provider',
    cors: true // needed for katacoda environment
});

describe('Category API test', () => {
    // (3) Setup Pact lifecycle hooks
    beforeEach(() => mockProvider.setup());
    afterEach(() => mockProvider.verify());
    afterEach(() => mockProvider.finalize());

    it('get category by ID', async () => {
        // (4) Arrange
        const expectedProduct = { id: 'cdb02322-a8a6-4acf-9644-ddf8b24af9e6', name: 'My another category' }

        await mockProvider.addInteraction({
            state: 'a category with ID 10 exists',
            uponReceiving: 'a request to get a category',
            withRequest: {
                method: 'GET',
                path: '/category/cdb02322-a8a6-4acf-9644-ddf8b24af9e6'
            },
            willRespondWith: {
                status: 200,
                headers: {
                    'Content-Type': regex({generate: 'application/json; charset=utf-8', matcher: '^application\/json'}),
                },
                body: like(expectedProduct),
            },
        });

        // (5) Act
        const api = new CategoryApiClient(mockProvider.mockService.baseUrl);
        const category = await api.getCategory("cdb02322-a8a6-4acf-9644-ddf8b24af9e6");

        // (6) Assert that we got the expected response
        expect(category).to.deep.equal(new Category('cdb02322-a8a6-4acf-9644-ddf8b24af9e6', 'My another category'));
    });
});
