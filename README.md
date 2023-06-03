# Fetch Technology Test Project - Pham Vinh Nhan

## 1.Prerequisites

-   `NodeJS` version `16.19.1`
-   `Yarn` version `1.22.19`
-   `Docker` is required if postgresql is not installed on your machine

## 2. Installation

1. Clone the project
2. Run `yarn install` to install dependencies
3. Run `docker-compose up -d` to start postgresql (optional)
4. Run `yarn run start:dev` to start the project

## 3. Features

### Basic Requirements

-   [x] API to list all the available rooms for any particular day in the future
-   [x] API to book multiple rooms for a number of days
-   [x] API to cancel any booking

### Intermediate Requirements

-   [x] Administrator could be just seeded
-   [x] Administrator can login, logout and create/delete room(s)
-   [x] Customer can sign up, sign in, sign out, view available rooms and make booking
-   [x] Customer can edit any booking before the start date
-   [x] API to list all the available rooms for any particular time frame in the future

### Advanced Requirements

-   [ ] Queue-integrated system to ensure only one customer book at the same time for
        a room (to prevent race condition)
-   [ ] Limitation for booking transactions per customer within a predefined interval
