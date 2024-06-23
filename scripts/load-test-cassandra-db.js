import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metric to track the error rate
let errorRate = new Rate('errors');

export let options = {
    stages: [
        { duration: '1m', target: 500 },
        { duration: '2m', target: 1500 },   // Stay at 5000 users for 5 minutes
        { duration: '2m', target: 3500 },  // Stay at 30000 users for 5 minutes
        { duration: '1m', target: 4000 },
        { duration: '1m', target: 0 },
        // { duration: '2m', target: 500 },   // Ramp-up to 500 users
        // { duration: '3m', target: 1500 },  // Maintain 1500 users
        // { duration: '5m', target: 3500 },  // Maintain 3500 users for a prolonged period
        // { duration: '2m', target: 5000 },  // Spike to 5000 users
        // { duration: '3m', target: 0 },
    ],
    thresholds: {
        errors: ['rate<0.1'], // Less than 10% errors
    },
};

export default function () {
    const userId = 67; // Simulating a single user ID for simplicity; adjust as needed
    const url = `http://localhost:80/party/${userId}`; // Updated URL to include userId
    const params = {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imx2UlBUMEJpN1Q2d0hlQmVHUlVobSJ9.eyJpc3MiOiJodHRwczovL2Rldi0xc3R6eHN5c3E3ZHF1MWowLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJ5b0ttMmdhZWl6QXlEZExWOGRwd1JORTBGb3dyVnhyNEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hcGkubW92aW1pbmdsZS5jb20iLCJpYXQiOjE3MTc4NTcxODUsImV4cCI6MTcxNzk0MzU4NSwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoieW9LbTJnYWVpekF5RGRMVjhkcHdSTkUwRm93clZ4cjQifQ.sL017r3VxcoWdTd-g-yzxksDAmrVpYyYYHYzv17PN28R5fNizL0AOsrUCTWa-Btax3-uF8WloqRlmURzyUWM0a9_ZLDnIN84pUnwbo8g4f5jXEdJH_Ebq2MiNXOmw1-PBZ5WgkE1k_DzYRrpLZ7hOCTqGdquXbzI0PpwtE8suJmgAxjCxZwv5tAQfYdaojrGsGcqB2l54j0krDhcBdLEzZPWLGhZxZU3VOTrcV2HXr9iBjt8GB7zoFFd2L9RdtZQ2gCehGDU9xVth-rifzb6zeusdWHoqZ5MfzXJ8McAFB2EEJzlUENwrzpgKDUT8TkCLF1u7xKlcWUaWqtT5YnWvA',
        },
    };

    // Using http.get to send a GET request
    const res = http.get(url, params);

    const success = check(res, {
        'status is 200': (r) => r.status === 200,
        'response body is not empty': (r) => r.body.length > 0,
    });

    // Log the response details if the request fails
    if (!success) {
        console.log(`Request failed with status ${res.status} and body ${res.body}`);
    }

    // Track the error rate
    errorRate.add(!success);

    sleep(1);
}
