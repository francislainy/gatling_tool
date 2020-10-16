const axios = require('axios')
const Category = require("../model/Category");

class ToolDataService {

    constructor(url) {
        this.url = url
    }

    retrieveTable() {
        return axios.get('http://localhost:8081/api/gatling-tool/report')
    }

    retrieveCategory(id) {
        return axios.get(`${this.url}/api/gatling-tool/category/${id}`).then(r => new Category(r.data.id, r.data.name));
    }

    retrieveReportItem(id) {
        return axios.get(`http://localhost:8081/api/gatling-tool/report/${id}`)
    }

    retrieveStatsForReport(id) {
        return axios.get(`http://localhost:8081/api/gatling-tool/stats/report/${id}`)
    }

    deleteTable(id) {
        return axios.delete(`http://localhost:8081/gatling-tool?id=${id}`)
    }

    retrieveCategories() {
        return axios.get('http://localhost:8081/api/gatling-tool/category')
    }

    createCategory(payload) {
        return axios.post('http://localhost:8081/api/gatling-tool/category', payload)
    }

    updateReport(id, payload) {
        return axios.put(`http://localhost:8081/api/gatling-tool/report/${id}`, payload)
    }

    submitFile(file) {
        console.log('entered submit file')
        return axios.post('http://localhost:8081/api/gatling-tool/csv/upload', file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

}

module.exports = ToolDataService
