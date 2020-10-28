"use strict"

/**
 *  export PACT_BROKER_BASE_URL=https://fcampos.pactflow.io export PACT_BROKER_TOKEN=jBQLotqEIjcrzr8ybO_tBw
 *  npm run publish
 */

const expect = require("chai").expect
const path = require("path")
const {Pact} = require("@pact-foundation/pact")
const {getMeCategoryIncludeReports} = require("../api")
const {uuid, string, eachLike, integer} = require('@pact-foundation/pact/dsl/matchers');

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
        category: {
            id: uuid("58330784-983c-4ae9-a5a1-d8f8d2b70a59"),
            title: string("My category"),
            reports: eachLike({
                id: uuid("87f2ebeb-880e-4541-bcf1-d317067b9e6b"),
                title: string("My report"),
                runDate: integer(1591609820902), //todo: timestamp
                createdDate: integer(1591609820902)
            })
        }
    }

    // Setup the provider
    before(() => provider.setup())

    // Write Pact when all tests done
    after(() => provider.finalize())

    // verify with Pact, and reset expectations
    afterEach(() => provider.verify())

    describe("get /category/58330784-983c-4ae9-a5a1-d8f8d2b70a59/include-reports", () => {
        before(done => {
            const interaction = {
                state: "a request for a single category including its children reports",
                uponReceiving: "a request for a single category including its children reports",
                withRequest: {
                    method: "GET",
                    path: "/category/cdb02322-a8a6-4acf-9644-ddf8b24af9e6/include-reports",
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

            getMeCategoryIncludeReports(urlAndPort).then(response => {
                try {
                    expect(response.data).to.eql(EXPECTED_BODY)
                } catch (e) {
                }
                done()
            }, done)
        })
    })
})