"use strict"

const expect = require("chai").expect
const path = require("path")
const {createCategory} = require("../../api");
const {Pact} = require("@pact-foundation/pact")
const {uuid, string} = require('@pact-foundation/pact/dsl/matchers');

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

    const EXPECTED_BODY =
        {
            id: uuid("29bccad9-c27f-46d3-83cf-51c8bfe405bb"),
            title: string("My 29 category"),
        }


    // Setup the provider
    before(() => provider.setup())

    // Write Pact when all tests done
    after(() => provider.finalize())

    // verify with Pact, and reset expectations
    afterEach(() => provider.verify())

    const payload = {
        "id": "29bccad9-c27f-46d3-83cf-51c8bfe405bb",
        "title": "My 29 category",
    }

    describe("post /category", () => {
        before(done => {
            const interaction = {
                state: "a request to create a category",
                uponReceiving: "a request to create a category",
                withRequest: {
                    method: "POST",
                    path: "/api/gatling-tool/category",
                    headers: {
                        Accept: "application/json",
                    },
                    body: payload,
                },
                willRespondWith: {
                    status: 201,
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
                payload: payload
            }

            createCategory(urlAndPort).then(response => {
                expect(response.status).to.eql(201)
                done()
            }, done)
        })
    })
})