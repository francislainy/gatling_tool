const axios = require('axios')
const Category = require("../model/Category");

class Api {

    constructor(url) {
        this.url = url
    }

    retrieveTable() {
        return axios.get('http://localhost:8081/api/gatling-tool/report')
    }

    deleteReport(id) {
        return axios.delete(`http://localhost:8081/api/gatling-tool/report/${id}`)
    }

    retrieveReportItem(id) {
        return axios.get(`http://localhost:8081/api/gatling-tool/report/${id}`)
    }

    updateReport(id, payload) {
        return axios.put(`http://localhost:8081/api/gatling-tool/report/${id}`, payload)
    }

    createReport(payload) {
        return axios.post('http://localhost:8081/api/gatling-tool/report', payload)
    }

    retrieveStatsForReport(id) {
        return axios.get(`http://localhost:8081/api/gatling-tool/stats/report/${id}`)
    }

    retrieveCategories() {
        return axios.get('http://localhost:8081/api/gatling-tool/category')
    }

    createCategory(payload) {
        return axios.post('http://localhost:8081/api/gatling-tool/category', payload)
    }

    retrieveCategory(id) {
        return axios.get(`${this.url}/api/gatling-tool/category/${id}`).then(r => new Category(r.data.id, r.data.name));
    }

    submitFile(file) {
        console.log('entered submit file')
        return axios.post('http://localhost:8081/api/gatling-tool/csv/upload', file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    submitJsonStats(id, file) {
        console.log('entered submit file')

        return axios.post(`http://localhost:8081/api/gatling-tool/json/import/${id}`, file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

}

module.exports = Api
