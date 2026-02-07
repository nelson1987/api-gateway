import { check, sleep } from 'k6';
import http from 'k6/http';

export default function () {
    let url = 'https://your-api-gateway-url';

    // Validate GET request
    let response = http.get(url + '/endpoint1');
    check(response, { 'status was 200': (r) => r.status === 200 });

    // Validate POST request
    let payload = JSON.stringify({ key: 'value' });
    response = http.post(url + '/endpoint2', payload, {
        headers: { 'Content-Type': 'application/json' },
    });
    check(response, { 'status was 201': (r) => r.status === 201 });

    // Validate PUT request
    response = http.put(url + '/endpoint3/1', payload, {
        headers: { 'Content-Type': 'application/json' },
    });
    check(response, { 'status was 200': (r) => r.status === 200 });

    // Add sleep to simulate user wait time
    sleep(1);
}