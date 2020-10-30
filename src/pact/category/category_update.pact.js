"use strict"

const expect = require("chai").expect
const {updateCategory} = require("../../api");
const {uuid, string} = require('@pact-foundation/pact/dsl/matchers');
const {provider, url, port} = require("../helper");

describe("Category API test", () => {

    const EXPECTED_BODY = {
        id: uuid("87f2ebeb-880e-4541-bcf1-d317067b9e6b"),
        title: string("My report"),
    }

    const payload = {
        "id": "58330784-983c-4ae9-a5a1-d8f8d2b70a59",
        "title": "my title",
    }

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
            const axiosParams = {
                url: url,
                port: port,
                id: payload.id,
                payload: payload,
            }
            updateCategory(axiosParams).then(response => {
                expect(response.status).to.eql(200)
                done()
            }, done)
        })
    })
})