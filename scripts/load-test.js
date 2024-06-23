import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metric to track the error rate
let errorRate = new Rate('errors');

export let options = {
    stages: [
        { duration: '1m', target: 1500 },
        { duration: '2m', target: 4000 },   // Stay at 5000 users for 5 minutes
        { duration: '1m', target: 4500 },  // Stay at 30000 users for 5 minutes
        { duration: '1m', target: 3500 },
        { duration: '1m', target: 0 },      // Ramp-down to 0 users over 2 minutes
    ],
    thresholds: {
        errors: ['rate<0.1'], // Less than 10% errors
    },
};

export default function () {
    const url = 'http://localhost:80/favorites?userId=67';
    const params = {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imx2UlBUMEJpN1Q2d0hlQmVHUlVobSJ9.eyJpc3MiOiJodHRwczovL2Rldi0xc3R6eHN5c3E3ZHF1MWowLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJ5b0ttMmdhZWl6QXlEZExWOGRwd1JORTBGb3dyVnhyNEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hcGkubW92aW1pbmdsZS5jb20iLCJpYXQiOjE3MTY4MDc5MzcsImV4cCI6MTcxNjg5NDMzNywiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoieW9LbTJnYWVpekF5RGRMVjhkcHdSTkUwRm93clZ4cjQifQ.Wzb4StDaw4lPINdwUwtlKxZB8i67oubrQeCszvH1Dgs06Rk2Z0jG9kirjdpHTKH9EPfSTtDgRjqpxfw8lpM8h6pUb45uXEuYEZpffUyQ0QU387XdDWhuA1CEcy5EEj3OUQ1J3nj6EaTErrGEJhw-ryPzNEcdpCDUQwmEpkPm4LlVzzIA67kuyf1FG12RiB6wzrm4E9fOiccxyF8w9cplHu8Bm4hgPacRnWb8rmWRCVJhJOfdcJMjSJbGWzbJgQEOhB9FGinkgXfx0vPy7jLZA28C1JV6pE3ozYJRJZ94oNusOfSl_rNYu6Qv30RwQJa3ACgnKMJ0wpeZDMpzQRnnog'
        },
    };

    // Send GET request
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
