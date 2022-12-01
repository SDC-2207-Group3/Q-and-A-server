# Atelier Question and Answer Service

The Atelier Question and Answer service supports the Q & A section of the [Atelier product page](https://github.com/FEC5/atelier-ecommerce-application).

![ezgif com-gif-maker](https://user-images.githubusercontent.com/94769046/195728400-7b3cd63b-f3f6-4b42-82a1-c79eaca69340.gif)

## Overview

Atelier's Q & A service is supported by 5 AWS EC2 instances:
- 3 identical Host Servers
- 1 Nginx Load Balancing
- 1 Mongo Database

With an initial goal of 1000RPS with <1% error rate and <2000ms response time, Atelier's Q & A service was able to meet over 80% of these requirements. The above system supports 800 client requests per second with an average response time of 6 to 11 milliseconds and 0% error rate.


## Planning and Considerations

MongoDB was chosen for this particular service due to its ability to store varying data types within a single collection. Mongo schemas are also flexible and easily edited after database creation. MongoDB systems are simple to scale and offer additional tools for sharding.

###ETL Process

Over 1,550MB of old data was extracted, cleaned, and then loaded in batches into the database using CSV-parser and a custom loading function.

### Schema Design

The Q&A database is simple and consists of two different schemas held within a single collection:
* Question Schema (QSchema)
* Answer Schema (ASchema)

As one might expect, Question Schema defines the structure of user questions, and Answer Schema defines the structure of user/seller Answers

Original schema designs included a third schema, Product Schema, which incorporated the Question and Answer schemas. During optimization phase, this schema was dropped to remove gratuitous nestedness to improve query time.


## Performance Optimization & Refactoring

### Local Testing:

Before restructuring schema or optimizing queries, pulling specific documents based on nested information proved to be far too slow. Simple requests via Postman showed response times of over 30 seconds.

![](/imgs/Screen Shot 2022-09-19 at 1.45.03 PM.png)

After updating the schema, local response time for a single request improved exponentially.

![](/imgs/Screen Shot 2022-11-30 at 2.46.32 PM.png)

Further query optimization and indexing fields on Question Schema improved response time by an additional 130%.

![](/imgs/Screen Shot 2022-09-19 at 3.51.40 PM.png)

Local, randomized load testing with K6 of the `product_id` parameter showed an average request duration of 38.46ms at 100 client requests per second (rps).

![](/imgs/Screen Shot 2022-09-20 at 4.02.28 PM.png)

At 1000 rps, request duration increased to an average of 5.02 seconds, falling short of initial goals of < 2000ms response time.

![](/imgs/100RPSk6.png)

### Deployment:

After deploying the database and server to AWS EC2 instances, stress testing with [loader.io](loader.io) demonstrated that the service could handle throughput of 350 rps with 297ms average response time (including 65-70ms loader.io latency period) and an error rate of .8% with a single host server.

![](/imgs/Screen Shot 2022-09-23 at 2.25.05 PM.png)


### Load Balancing:

To get to the final goal of 1000RPS at <2000ms avg response time, and NGINX load balancer was created and deployed to the AWS system to distribute request in round-robin fashion.

### Further Optimizations:

After implimentation of the load balancer, an additional 2 servers were added to the system.

The second server provided supported needed to reach 700 RPS at 181ms avg. response time (including testing software latency period of 65-70ms), but error rate increased to 2%.

![](/imgs/Screen Shot 2022-09-23 at 3.03.19 PM.png)

The final server added allowed the system to reach 900 RPS at 435ms avg. response time (including testing software latency period of 65-70ms), and an error rate of 1.9%

![](/imgs/Screen Shot 2022-09-24 at 11.18.25 AM.png)

The system can efficiently handle 800 RPS with 75ms avg. response time (including testing software latency period of 65-70ms) and an error rate of 0%.

![](/imgs/Screen Shot 2022-09-24 at 11.14.21 AM.png)

## Further Documentation

- [Deployment Instructions](/Deployment-Instructions.md)
