---
title: Integration Tests, Serverless Architecture, and Flakiness: A Tale of Troubleshooting
summary: A tale of integration test woes
tags: [testing, serverless, aws]
date: '2023-07-07'
draft: true
---

We use integration tests heavily at work. They're a great way to confirm that functional pieces
of our systems work together as expected. I have been working on a microservice for a few months
and have gradually built up a suite of tests to ensure that the various internal components work
together as expected.

Internally, the tests are nothing groundbreaking. We use [Jest](https://jestjs.io) to run the tests
and a few helper libraries like [wait-for-expect](https://www.npmjs.com/package/wait-for-expect) to
wait for asynchronous operations to complete.

Approximately one in five runs would fail, but the failure was not consistent.
Typically, re-running our CI pipeline would result in a pass.

It turns out that several elements of this particular component were either badly designed or
misunderstood by me. I felt it was worth documenting the issues I encountered and how I resolved
them.

## The component

This particular component is a series of AWS services that are initially triggered by a cloudwatch
event. The event is triggered by a cron expression and is responsible for handling when a row in a database
has a date value of today.

The flow looks something like this:
event trigger → lambda → SQS queue → lambda → lambda → DynamoDB write → completion

The integration test generates a row in the database with a date value of today, triggers the lambda and
then waits for the final lambda to write a row to the database. The test then asserts that the row was
written correctly.

## The issues

### Issue 1: Race conditions

After spending a fair bit of time stepping through code and following exactly what was happening, I
realised that at a certain point in the flow, I was making several async requests to a lambda that writes
to the database. This was happening via a `Promise.all` call.
The code receiving this request takes a single incoming value, and a row with a map of values, then overwrites the
new value along with the map of values. This concurrent overwriting meant that the final value was not as expected.
However, the test would still sometimes pass....

### Issue 2: The test assertions were inadequate

This is a really simple one and would have immediately removed the flakiness aspect of the test.

The feature writes n number of values to the previously mentioned map. The test was asserting that one value
of this map was correctly updated. However it wasn't asserting that the other values were correct. So when you consider
our race condition issue, the test was passing because some of the time, one value would be correct as it was written
first, but the others would be old values.

Simply asserting that both values were correct would have made the test fail 100% of the time and made diagnosing the issue much easier.

### Issue 3: `middy` was not being used correctly

We use [middy](https://github.com/middyjs/middy) to provide middleware for our lambdas. In this particular use case,
we use the `sqs-partial-batch-failure` middleware to handle when a message from a batch fails to be processed.
I added the middleware as an afterthought and didn't really consider how it worked. I assumed that it would
handle thrown errors and retry the message. However, in the code I was not considering how promises were resolving.
For example, given 10 messages in a batch, middy requires that all 10 messages resolve before it will consider the batch
as complete. If one message fails, it will continue to retry until it is resolved. This was not happening in my code, so the batch
was retrying even if the test assertion had passed, resulting in very confusing application logs.

### Issue 4: There was a promise not being `await`ed

Relatively simple one. I was not awaiting a promise, so the test was completing before the promise had resolved.

## Changes / improvements

### Use consistent reads in DynamoDB

In DynamoDB, a consistent read returns a result that reflects all writes that received a successful response prior to the read. Essentially, it's a read operation that returns the most recent data. If a request doesn't specify a read consistency model, DynamoDB defaults to eventually consistent reads, which doesn't guarantee that the data returned is the most recent but it is faster.
In this particular case, it made the most sense to use consistent reads as I wanted to ensure that the data being read was the most recent.

### Use `Promise.allSettled` instead of `Promise.all`
Promise.all and Promise.allSettled are both methods for handling multiple promises in JavaScript, but they handle the resolution and rejection of those promises differently. Promise.all takes an array of promises and returns a new promise that only resolves when all the promises in the array have resolved. If any of the promises are rejected, Promise.all immediately rejects with the reason of the first promise that was rejected. This can be an issue if you need to handle multiple asynchronous operations (like in this case) and need a result from each, regardless of whether they resolve or reject.

On the other hand, Promise.allSettled also takes an array of promises, but it always resolves after all the promises have settled, whether they were resolved or rejected. This allows you to handle each promise's result individually. When Promise.allSettled is resolved, it gives you an array of objects where each object describes the outcome of each promise (either fulfilled or rejected). This can be useful if you want to run multiple independent operations concurrently and handle their results separately, without stopping at the first rejection like Promise.all does.

### Use lambdas fronted by SQS queues rather than invoking them directly

Invoking Lambdas directly can lead to challenges with error handling, retry logic, and managing concurrency, particularly when dealing with multiple asynchronous requests. By placing SQS queues in front of our Lambdas, we can take advantage of the native capabilities of SQS such as message durability, automatic retries, and dead-letter queues, providing a more robust and resilient system. This architectural change allows us to decouple the services, enabling them to operate independently and effectively manage the flow of information.
An added benefit is that the Lambdas will only process messages as they arrive in the queue, helping to prevent overloading of the system and providing a more reliable and scalable solution. In addition to this, we wouldn't flood our account with lambda invocations when the queue is busy and could potentially block AppSync requests.

### Use `middy` correctly

When used appropriately, `middy` middleware can drastically improve the reliability and maintainability of serverless functions. Understanding how middy handles promises and errors is crucial to avoiding unexpected behavior, especially when processing batches of messages with the sqs-partial-batch-failure middleware. I had misconceived that `middy` would handle thrown errors and automatically retry messages, however, the reality is that middy requires all promises to resolve before it considers the batch complete. Failing to adhere to this requirement, as I discovered, can lead to repeated retries even if the test assertion had already passed, resulting in very confusing application logs. Once I understood this, I made necessary adjustments to ensure all promises were correctly handled and resolved, improving the reliability of the entire system.

### Await all promises

Awaiting all promises ensures that JavaScript waits until the promise settles and returns its result. This allows the program to handle the promise's result before moving on, thereby avoiding potential issues like those I experienced where the test completed before the promise had resolved. By ensuring all promises are awaited, we can eliminate a common source of bugs in asynchronous JavaScript code.

## Conclusion

Overall, these issues were a good reminder that assumptions can often lead to issues down the line. The process of resolving them has also led to several improvements to our serverless architecture and testing methodology, both of which will benefit future development efforts.

As developers, we should always remember to question our assumptions, test our code thoroughly, and not be afraid to dive deep when issues arise. As I discovered, the solution can often lead to learning new things and making improvements that benefit not just the current project but future ones as well.
