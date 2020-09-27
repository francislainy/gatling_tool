import axios from 'axios';

class ToolDataService {

    retrieveTable() {
        return axios.get('http://localhost:8081/api/gatling-tool/report')
    }

    retrieveReportItem(id) {
        return axios.get(`http://localhost:8081/api/gatling-tool/report/${id}`)
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