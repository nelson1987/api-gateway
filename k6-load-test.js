import http from 'k6/http';
import { check, sleep } from 'k6';

// Define the API Gateway URL
const url = 'https://your-api-gateway-url';

export const options = {
    gracefulShutdown: true,
    vus: 10, // Number of virtual users
    duration: '30s', // Test duration
};

export default function () {
    // Sending a GET request to the API Gateway endpoint
    let res = http.get(`${url}/your-endpoint`);

    // Check the response status
    check(res, {'status is 200': (r) => r.status === 200});

    // Simulate some virtual user wait time
    sleep(1);
}