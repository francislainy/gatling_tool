import axios from 'axios';

class ToolDataService {

    retrieveTable() {
        return axios.get('http://localhost:8081/api/gatling-tool/report')
    }

    retrieveReportItem(id) {
        return axios.get(`http://localhost:8081/api/gatling-tool/report/${id}`)
    }

    retrieveStatsForReport(id) {
        // return axios.get(`http://localhost:8081/api/gatling-tool/stats/report/${id}`)
        return axios.get(`http://localhost:8081/api/gatling-tool/stats/report/b7345265-4c47-4388-ae36-b66cb3370175`)
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

    submitFile(file) {
        console.log('entered submit file')
        return axios.post('http://localhost:8081/api/gatling-tool/csv/upload', file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

}

export default new ToolDataService()