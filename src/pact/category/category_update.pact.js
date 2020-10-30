"use strict"

const expect = require("chai").expect
const path = require("path")
const {updateCategory} = require("../../api");
const {Pact} = require("@pact-foundation/pact")
const {eachLike, uuid, string, integer} = require('@pact-foundation/pact/dsl/matchers');

describe("Category API test", () => {
    let url = "http://localhost"
    const port = 8992

    const provider = new Pact({
        port: port,
        log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
        dir: path.resolve(process.cwd(), "pacts"),
        spec: 2,
        consumer: "FRONTEND",
        provider: "BACKEND",
        pactfileWriteMode: "merge",
    })

    const EXPECTED_BODY = {
        id: uuid("87f2ebeb-880e-4541-bcf1-d317067b9e6b"),
        title: string("My report"),
    }

    const payload = {
        "id": "58330784-983c-4ae9-a5a1-d8f8d2b70a59",
        "title": "my title",
    }


// Setup the provider
    before(() => provider.setup())

// Write Pact when all tests done
    after(() => provider.finalize())

// verify with Pact, and reset expectations
    afterEach(() => provider.verify())

    describe("put /category/58330784-983c-4ae9-a5a1-d8f8d2b70a59", () => {
        before(done => {
            const interaction = {
                state: "a request to update a category",
                uponReceiving: "a request to update a category",
                withRequest: {
                    method: "PUT",
                    path: "/api/gatling-tool/category/58330784-983c-4ae9-a5a1-d8f8d2b70a59",
                    headers: {
                        Accept: "application/json",
                    },
                    body: payload
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: EXPECTED_BODY,
                },
            }
            provider.addInteraction(interaction).then(() => {
                done()
            })
        })

        it("returns the correct response", done => {
            const urlAndPort = {
                url: url,
                port: port,
                id: payload.id,
                payload: payload,
            }
            updateCategory(urlAndPort).then(response => {
                expect(response.status).to.eql(200)
                done()
            }, done)
        })
    })
})