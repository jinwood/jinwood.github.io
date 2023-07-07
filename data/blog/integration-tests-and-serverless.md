---
title: On integration tests, serverless and flakiness
summary: A tale of integration test woes
tags: [testing, serverless, aws]
date: '2023-07-07'
---

We use integration tests heavily at work. They're a great way to confirm that functional pieces
of our systems work together as expected. I have been working on a microserver for a few months
and have gradually built up a suite of tests to ensure that the various internal components work
together as expected.
Internally, the tests are nothing groundbreaking. We use [Jest](https://jestjs.io) to run the tests
and a few helper libraries like [wait-for-expect](https://www.npmjs.com/package/wait-for-expect) to
wait for asynchronous operations to complete.

I spent more time than I'm willing to admit trying to figure out why one test in particular was
intermittently failing. Approximately 1 in 5 runs would fail, but the failure was not consistent.
Typically, re-running our CI pipeline would result in a pass.

It turns out that several elements of this particular component were either badly designed or
missunderdtood by me. I felt it was worth documenting the issues I encountered and how I resolved
them.

## The component

This particular component is a series of AWS services that are initially triggered by a cloudwatch
event. The event is triggered by a cron expression and is responsible for handling when a row in a database
has a date value of today.

The flow looks something like this:
event trigger > lambda > SQS queue > lambda > lambda > dynamo db write > complete

The integration test generates a row in the database with a date value of today, triggers the lambda and
then waits for the final lambda to write a row to the database. The test then asserts that the row was
written correctly.

## The issues

### Issue 1: Race conditions

After spending a fair bit of time stepping through code and following exactly what was happening, I
realised that at a certain point in the flow, I was making several async requests to a lambda that writes
to the database. This was happening via a `Promise.all` call.
The code receiving this request takes single incoming value, and a row with a map of values, then overwrites the
new value along with the map of values. The issue was that the map of values was being overwritten by
multiple requests at the same time. This meant that the final value was not what was expected.
However, the test would still sometimes pass....

### Issue 2: The test assertions were inadequate

This is a really simple one and would have immediatley removed the flakiness aspect of the test.

The feature writes n number of values to the previously mentioned map. The test was asserting that one value
of this map was correctly updated. However it wasn't asserting that the other values were correct. So when you consider
our race condition issue, the test was passing because some of the time, one value would be correct as it was written
first, but the others would be old values.
