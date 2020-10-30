"use strict"

const expect = require("chai").expect
const {provider, url, port} = require("../helper");
const {createCategory} = require("../../api");
const {uuid, string} = require('@pact-foundation/pact/dsl/matchers');

describe("Category API test", () => {

    const EXPECTED_BODY =
        {
            id: uuid("29bccad9-c27f-46d3-83cf-51c8bfe405bb"),
            title: string("My 29 category"),
        }

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

            const axiosParams = {
                url: url,
                port: port,
                payload: payload
            }

            createCategory(axiosParams).then(response => {
                expect(response.status).to.eql(201)
                done()
            }, done)
        })
    })
})