import axios from 'axios';

class ToolDataService {

    retrieveToolItem() {
        return axios.get('http://localhost:8081/gatling_tool/t')
    }

    retrieveTable() {
        return axios.get('http://localhost:8081/gatling_tool/table_items')
    }

    deleteTable(id) {
        return axios.delete(`http://localhost:8081/gatling_tool?id=${id}`)
    }

}

export default new ToolDataService()