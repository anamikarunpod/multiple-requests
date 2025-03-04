# multiple-requests

brew install k6

k6 run script.js


expected output:

```
     ✓ is status 200
     ✓ job ID present
     ✗ job completed or failed
      ↳  20% — ✓ 217 / ✗ 849

     checks.........................: 66.91% 1717 out of 2566
     data_received..................: 132 MB 549 kB/s
     data_sent......................: 494 kB 2.1 kB/s
     http_req_blocked...............: avg=967.67µs min=0s      med=1µs     max=163.93ms p(90)=2µs      p(95)=2µs     
     http_req_connecting............: avg=398.98µs min=0s      med=0s      max=61.91ms  p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=123.24ms min=73.45ms med=92.85ms max=622.44ms p(90)=205.84ms p(95)=244.26ms
       { expected_response:true }...: avg=123.24ms min=73.45ms med=92.85ms max=622.44ms p(90)=205.84ms p(95)=244.26ms
     http_req_failed................: 0.00%  0 out of 1283
     http_req_receiving.............: avg=29.52ms  min=18µs    med=125µs   max=537.88ms p(90)=113.26ms p(95)=134.24ms
     http_req_sending...............: avg=206.2µs  min=20µs    med=179µs   max=4.95ms   p(90)=274.8µs  p(95)=353.79µs
     http_req_tls_handshaking.......: avg=523.2µs  min=0s      med=0s      max=89.99ms  p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=93.51ms  min=73.29ms med=87.91ms max=329.68ms p(90)=114.26ms p(95)=127.82ms
     http_reqs......................: 1283   5.331137/s
     iteration_duration.............: avg=8.57s    min=2.38s   med=8.7s    max=15.39s   p(90)=10.94s   p(95)=11.02s  
     iterations.....................: 217    0.901681/s
     vus............................: 1      min=1            max=10
     vus_max........................: 10     min=10           max=10


running (4m00.7s), 00/10 VUs, 217 complete and 0 interrupted iterations
default ✓ [======================================] 00/10 VUs  4m0s

```
