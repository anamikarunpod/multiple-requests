import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

// Example city list
const cities = [
    "New York", "Tokyo", "Paris", "London", "Sydney", "Berlin", "Kolkata", 
    "Moscow", "São Paulo", "Mumbai", "Shanghai", "Los Angeles", "Cairo", "Portland",
    "Toronto", "Amsterdam", "Munich", "Seoul", "Atlanta", "Delhi", "Chicago", "Perth",
    "Sydney", "Athens", "Dhaka"
];

// Authorization token
const API_KEY = 'XXX';
const RUNPOD_HOST_URL = 'https://api.runpod.ai/v2/pzpo64vb8stjc7/run';
const STATUS_URL = `https://api.runpod.ai/v2/pzpo64vb8stjc7/status`;

export let options = {
    stages: [
        { duration: '1m', target: 10 },
        { duration: '2m', target: 10 },
        { duration: '1m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<1500'],  // 95% of requests must complete below 1.5s
    },
};

export default function () {
    // Select a random city and set up the POST data and headers
    let city = randomItem(cities);
    let data = JSON.stringify({
        input: {
            prompt: `Hello from ${city}!`
        }
    });
    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
    };

    // POST request to start the job
    let postRes = http.post(RUNPOD_HOST_URL, data, params);
    let jobId = postRes.json().id;

    check(postRes, {
        'is status 200': (r) => r.status === 200,
        'job ID present': (r) => jobId !== undefined,
    });

    console.log(`Job triggered with ID: ${jobId}`);

    // Poll the job status endpoint until the job is completed or failed
    for (let retries = 10; retries > 0; retries--) {
        let getStatusRes = http.get(`${STATUS_URL}/${jobId}`, params);
        let status = getStatusRes.json().status;

        console.log(`Checking job status for job ID: ${jobId}: ${status}`);
        check(getStatusRes, {
            'is status 200': (r) => r.status === 200,
            'job completed or failed': (r) => ['COMPLETED', 'FAILED'].includes(status),
        });

        if (status === 'COMPLETED') {
            console.log("Job completed successfully.");
            break;
        } else if (status === 'FAILED') {
            console.error("Job failed.");
            break;
        }

        if (retries > 1) {
            sleep(2);
        }
    }
}