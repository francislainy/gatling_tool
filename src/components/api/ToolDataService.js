import axios from 'axios';

class ToolDataService {

    retrieveToolItem() {
        return axios.get('http://localhost:8081/gatling-tool/t')
    }

    retrieveTable() {
        return axios.get('http://localhost:8081/gatling-tool/table-items')
    }

    deleteTable(id) {
        return axios.delete(`http://localhost:8081/gatling-tool?id=${id}`)
    }

    retrieveCategories() {
        return axios.get('http://localhost:8081/gatling-tool/get-categories')
    }

    createCategory(category) {
        return axios.post('http://localhost:8081/gatling-tool/create-category', category)
    }

}

export default new ToolDataService()