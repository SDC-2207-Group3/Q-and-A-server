import { sleep, check } from 'k6'
import { URLSearchParams } from 'https://jslib.k6.io/url/1.0.0/index.js';
import http from 'k6/http'

// See https://k6.io/docs/using-k6/options
export const options = {
  stages: [
    { duration: '30s', target: 1000 },
    // { duration: '3m', target: 20 },
    // { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(100)<3000'], // 100% requests should be below 3s
  },

}

export default function main() {
  const url = 'http://localhost:3000/qa/questions';
  const searchParams = new URLSearchParams([
    ['product_id', '2'],
    ['count', '50']
  ]);
  const res = http.get(`${url}?${searchParams.toString()}`);
  check(res, {'status was 200': r => r.status == 200});
  sleep(1);
}