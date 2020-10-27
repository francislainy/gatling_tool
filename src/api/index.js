"use strict"

const axios = require("axios")

exports.getMeCategory = endpoint => {
    const url = endpoint.url
    const port = endpoint.port

    return axios.request({
        method: "GET",
        baseURL: `${url}:${port}`,
        url: "/category/cdb02322-a8a6-4acf-9644-ddf8b24af9e6",
        headers: { Accept: "application/json" },
    })
}

exports.getMeCategories = endpoint => {
    const url = endpoint.url
    const port = endpoint.port

    return axios.request({
        method: "GET",
        baseURL: `${url}:${port}`,
        url: "/category",
        headers: { Accept: "application/json" },
    })
}

exports.getMeDogs = endpoint => {
    const url = endpoint.url
    const port = endpoint.port

    return axios.request({
        method: "GET",
        baseURL: `${url}:${port}`,
        url: "/dogs",
        headers: { Accept: "application/json" },
    })
}

exports.getMeDog = endpoint => {
    const url = endpoint.url
    const port = endpoint.port

    return axios.request({
        method: "GET",
        baseURL: `${url}:${port}`,
        url: "/dogs/1",
        headers: { Accept: "application/json" },
    })
}