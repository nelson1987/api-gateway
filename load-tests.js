import { check, sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'https://your-api-gateway-url.com';
const ENDPOINTS = [
    '/endpoint1',
    '/endpoint2',
    '/endpoint3',
    // Add more endpoints as needed
];

export let options = {
    vus: 10, // Number of virtual users
    duration: '30s', // Test duration
};

export default function () {
    for (let endpoint of ENDPOINTS) {
        let response = http.get(`${BASE_URL}${endpoint}`);
        check(response, { 'status was 200': (r) => r.status === 200 });
        sleep(1); // Pause between requests
    }
}