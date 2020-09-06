import axios from 'axios';

class ToolDataService {

    retrieveToolItem() {
        return axios.get('http://localhost:8081/gatling-tool/t')
    }

    retrieveTable() {
        return axios.get('http://localhost:8081/gatling-tool/table-items')
    }

    retrieveCategories() {
        return axios.get('http://localhost:8081/gatling-tool/get-categories')
    }

    deleteTable(id) {
        return axios.delete(`http://localhost:8081/gatling-tool?id=${id}`)
    }

}

export default new ToolDataService()