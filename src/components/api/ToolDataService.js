import axios from 'axios';

class ToolDataService {

    retrieveToolItem() {
        return axios.get('http://localhost:8081/gatling_tool/t')
    }

}

export default new ToolDataService()