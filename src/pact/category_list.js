"use strict"

const expect = require("chai").expect
const path = require("path")
const {Pact} = require("@pact-foundation/pact")
const {getMeCategories} = require("../api")

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

    const EXPECTED_BODY = [

        {
            "categories": [
                {
                    id: "58330784-983c-4ae9-a5a1-d8f8d2b70a59",
                    title: "My category"
                },
                {
                    id: "58330784-983c-4ae9-a5a1-d8f8d2b70a59",
                    title: "My category"
                },
            ],
        },

    ]

    // Setup the provider
    before(() => provider.setup())

    // Write Pact when all tests done
    after(() => provider.finalize())

    // verify with Pact, and reset expectations
    afterEach(() => provider.verify())

    describe("get /category", () => {
        before(done => {
            const interaction = {
                state: "a request for all categories",
                uponReceiving: "a request for all categories",
                withRequest: {
                    method: "GET",
                    path: "/category",
                    headers: {
                        Accept: "application/json",
                    },
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
            }
            getMeCategories(urlAndPort).then(response => {
                expect(response.data).to.eql(EXPECTED_BODY)
                done()
            }, done)
        })
    })
})