import axios from 'axios';
const crm = axios.create({
    baseURL: "https://crm.viendong.edu.vn/api/OpenAPI/",
    headers: {
        'Content-Type': 'application/json',
    },
});

export default crm;