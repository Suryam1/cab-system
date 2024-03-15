
# Cab System Web Application

The Cab System is a web application that facilitates the booking of cabs and provides users with the shortest time and estimated cost for their trips. This README provides an overview of the project, its features, and how to set it up for use.

## 1. Description

The Cab System is a web application that enables users to book cabs and calculates the shortest possible time and estimated cost for their trips.

## 2. Features

### Cab Booking

- Users can book cabs by providing their email, pickup location, and drop location.

### Shortest Route Calculation

- The system calculates the shortest possible time from pickup location to drop location, considering multiple routes.

### Cab Management

- The system manages a fleet of 5 cabs with different pricing, ensuring that no two cabs have overlapping start and end times.

### Estimated Cost

- Users receive an estimated cost for their cab rides based on the selected cab and the time taken to reach the drop location.

### Cab Confirmation Email

-  Users receive email notifications at the time of booking with all the details.

### Booking Tracking

- Users can view and track their cab bookings within the system.

### Responsive Design

- The application is designed to be responsive, adapting to different screen sizes and devices.

### Admin Access

- The application assumes that only administrators will access it.



## 3. Assumptions

- The application is designed for use by administrators; no user login/signup pages are required.

## 4. Project Setup

To set up and run the Cab System web application, follow these steps:

1. Clone the project from the repository:
   ```
   git clone https://github.com/varisha-025/Scaler_Cab_System.git
   ```

2. Navigate to the project directory:
   ```
   cd Scaler_Cab_System
   ```

## Server

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install the required dependencies:
   ```
   npm install
   ```

3. Start the application:
   ```
   npm run dev
   ```
4. The server should now be running on your local server `http://localhost:3001`.

## Client

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install the required dependencies:
   ```
   npm install
   ```

3. Start the application:
   ```
   npm start
   ```

4. The client should now be running on your local server. 
Open your web browser and access it at `http://localhost:3000`.

## 5. Technologies Used

The Cab System web application is built using the following technologies:

- Frontend:
  - React: A JavaScript library for building user interfaces.
  - Axios: A promise-based HTTP client for making requests to the backend API.
  - Tailwind CSS: A CSS framework

- Backend:
  - Node.js: A JavaScript runtime for the server.
  - Express: A web application framework for Node.js.
  - MongoDB: A NoSQL database for data storage.

**Happy Cab Booking!**