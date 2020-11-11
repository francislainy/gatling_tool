const axios = require('axios')
const Category = require("../model/Category");

const url = "http://localhost:8081"

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

    deleteStats(id) {
        return axios.delete(`http://localhost:8081/api/gatling-tool/stats/${id}`)
    }

    updateStatsEndpoint(id, payload) {
        return axios.put(`http://localhost:8081/api/gatling-tool/stats/${id}/endpoint`, payload)
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

        const formData = new FormData()

        formData.append(
            "file",
            file[1].originFileObj,
            file[1].originFileObj.name
        );

        console.log('after formData')

        return axios.post(`http://localhost:8081/api/gatling-tool/json/import/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(result => {
            console.log(result)
        }).catch(reason => {
            console.log(reason)
        })
    }

    submitHtmlIndex(id, file) {
        console.log('entered submit file')

        const formData = new FormData()

        formData.append(
            "file",
            file[0].originFileObj,
            file[0].originFileObj.name
        );

        return axios.post(`http://localhost:8081/api/gatling-tool/report/upload/html/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(result => {
            console.log(result)
        }).catch(reason => {
            console.log(reason)
        })
    }

}

module.exports = Api
