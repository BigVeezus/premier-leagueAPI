# INSTALL PROJECT WITH

## Get Started

`npm install --force`

Documentation: https://documenter.getpostman.com/view/21609093/2s93z6ciRW

## To run on DOCKER

-First Docker Pull image to computer
run `docker pull bigveezus/premier-league-api2:latest`

-Seconly start docker image and expose container port 7000 to local port 8080
run `docker run --publish 8080:7000 bigveezus/premier-league-api2`

Enjoy!
.............................................................
.............................................................

# Software Developer Application Test

Create an API that serves the latest scores of fixtures of matches in a “**Mock Premier League**”

## User Types

There should be:

- **Admin accounts** which are used to
  - signup/login
  - manage teams (add, remove, edit, view)
  - create fixtures (add, remove, edit, view)
  - Generate unique links for fixture
- **Users accounts** who can
  - signup/login
  - view teams
  - view completed fixtures
  - view pending fixtures
  - robustly search fixtures/teams
- Only the search API should be availble to the public.

## Authentication and Session Management

1. Use redis as your session store.
2. Authentication and Authorization for admin and user accounts should be done using `Bearer token` and `JWT`.

## Tools/Stack

- NodeJs (TypeScript & Express) or Golang
- MongoDB
- Redis
- Docker
- POSTMAN

## Tests

Unit tests are a must, submissions without tests will be ignored.

## Submission

1. Your API endpoints should be well documented in POSTMAN.
2. Seed the db with lots of data before final submission.
3. Code should be hosted on a git repository, Github preferably.
4. The API should be hosted on a live server (e.g. https://heroku.com)
5. Your app should be `containerized` using `docker`.
6. Write e2e tests for all user stories
7. Implement `web caching` API endpoints using `Redis`.
8. Implement `rate limiting` for user account API access.

## Time Duration

7 days

## NB:

Please send an email to acknowledge the receipt of this document.
