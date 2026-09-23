# E-commerce-follow-along


Milestone 1 

This project is a mentor-led session to build a full-fledged e-commerce application using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It aims to provide hands-on experience in building real-world web applications with scalable and secure features.

The **MERN stack** is a popular technology stack used for building full-stack web applications. It is favored for its **JavaScript-only approach**, which allows developers to use a single programming language (JavaScript) across the entire application, both on the frontend and backend. This approach simplifies development and is particularly beginner-friendly

The MERN stack includes:
- **MongoDB** 
- **Express.js**
- **React.js**
- **Node.js**

A **REST API** (Representational State Transfer) is an architectural style for building web services that enables communication between a client and a server using standard HTTP methods like GET, POST, PUT, and DELETE. 

1. **User Authentication**
   - Register new users.
   - Log in existing users securely.
   
2. **Product Management**
   - Add new products.
   - Update product details.
   - Retrieve product data.

3. **Order Handling**
   - Manage customer orders.
   - Provide structured data responses (typically in JSON format).


## Basics of Database Schema Design

In **MongoDB**, schema design is the process of defining the structure and relationships of data stored in the database. This involves:
- Identifying key entities (e.g., Users, Products, Orders).
- Defining fields and their data types.
- Establishing relationships between collections (e.g., linking orders to users).

Good schema design ensures the database is:
- Efficient in handling queries.
- Scalable as the application grows.


## Role of Authentication in Web Applications

Authentication is the process of verifying the identity of a user before granting access to specific resources or functionalities. In our e-commerce application:
- Users will authenticate themselves through secure login mechanisms.
- Only authenticated users can make purchases or access sensitive information like order history.

Key goals of authentication:
- Protect user data.
- Prevent unauthorized access.
- Enable a personalized user experience.

---



**Milestone 2: Project Setup and Login Page**


In this milestone, we focused on setting up the initial front-end structure and implementing the login page for the application. Key achievements include:


---

## Milestone 3: Project Setup for Backend

### Objectives
In this milestone, we focused on setting up the backend structure, initializing a Node.js server, connecting the application to MongoDB, and implementing basic error handling.

---

### Milestone 4: Creating User Model and Controller

- Designed the User model with fields such as name, email, password, and role.
- Implemented user authentication and authorization mechanisms.
- Used bcrypt for password hashing and JWT for authentication.
- Integrated Multer for handling file uploads (e.g., profile images).
- Updated API routes for user management.
- Improved error handling and validation for user-related operations.


---

### Milestone 5: Creating the Signup Page

- Developed a user-friendly signup page using React.
- Integrated form validation to ensure valid user input.
- Connected the frontend with the backend API for user registration.
- Displayed appropriate error and success messages.
- Styled the page using modern UI components for a seamless user experience.
---

## Milestone 6: What Was Achieved

In this milestone, we completed the following:

- Implemented advanced product filtering and search functionality.
- Optimized backend API endpoints for better performance.
- Integrated payment processing using Stripe.
- Enhanced user authentication with JWT expiration handling.
- Improved UI/UX by refining product pages and checkout flows.
- Fixed bugs from previous milestones and improved error handling.
milestone7

----

# Milestone 7: User Login

This milestone focused on implementing a secure user login endpoint. Key achievements include:

* **Secure Password Handling:** Implemented bcrypt hashing for passwords, ensuring they are never stored in plain text.  This protects user credentials even in the event of a database breach.
* **Credential Validation:**  Developed a login endpoint that validates user credentials by comparing the bcrypt hash of the entered password with the stored hash.
* **User Authentication:** Successfully implemented user authentication based on validated credentials.  This allows the system to identify and authorize users.
* **Improved Security:**  Enhanced overall application security by implementing secure password handling practices.

---

# Milestone 8: Product Card Component

## Overview

In this milestone, I have implemented a reusable card component to showcase products dynamically on the homepage. The card component is designed to display product details such as name, image, and price in a structured layout.

## Features

*   **Reusable Card Component:** A dynamic component that accepts product details as props.
*   **Dynamic Rendering:** Uses array mapping to render multiple product cards.
*   **Responsive Layout:** Designed using Flexbox/Grid for a clean and structured display.
*   **Improved User Experience:** Ensures a consistent and visually appealing product showcase.



# Milestone 9: Creating the Product Form
In this milestone, we focused on building a form that allows users to add products, including support for multiple product images. Key achievements include:

---

# Milestone 10: Product Schema and Endpoint

This milestone focuses on creating a Mongoose schema for products and building a POST endpoint to store product details in MongoDB.


## Implementation

*   **Product Schema:** The `product.js` file (or similar) defines the structure of product data (name, description, price, image URL, etc.) using Mongoose, with appropriate validation rules.
*   **Endpoint:** A POST endpoint (`/products` or similar) handles incoming product data, validates it, and saves it to the MongoDB database.

 mile11
---

# Milestone 11: Dynamic Product Display on Home Page

## Overview

This milestone focuses on making the home page display products dynamically by fetching data from the MongoDB database.  We will create a backend endpoint to retrieve product data and then use that data on the frontend to populate product cards.

## Implementation Details

*   The backend endpoint should use the appropriate MongoDB driver methods to retrieve all product documents.
*   The frontend `fetchProducts` function should use `fetch` or a similar library to make the API call.
*   The product card component should be designed to receive product data as props and display it accordingly.



----

# Milestone 12: My Products Page

## Overview

This milestone focuses on creating the "My Products" page, which displays all the products added by a specific user (identified by their email).  We will implement a backend endpoint to retrieve these products from MongoDB, filter them by email, and send them to the frontend.  The frontend will then dynamically display these products using the existing product card component.

## Learning Goals

*   Write an endpoint that filters data in MongoDB based on a user's email and sends the results to the frontend.
*   Receive data on the frontend.
*   Dynamically display the received data using the product card component.





# Milestone 13: Product Editing Functionality


## Overview

This project is a step-by-step implementation of an e-commerce platform.  Each milestone focuses on adding specific features and building upon the previous ones.  The current focus is on managing product data, including adding, displaying, and editing products.  The project utilizes a MongoDB database to store product information and a frontend interface to interact with the data through API endpoints.

*   Implemented the ability to edit existing product data.
*   Added an "Edit" button to product cards on the frontend.
*   Developed a backend endpoint to handle updating product details in the MongoDB database.
*   Implemented form auto-filling with existing product data for editing.
*   Users can now modify product information and save the changes.  This involved:
    *   Creating an API endpoint to receive updated product data.
    *   Implementing the update operation in MongoDB.
    *   Adding an edit button to the product card.
    *   Populating the edit form with existing product data.
    *   Enabling users to edit and save the updated data.


---

 # Milestone 14: Deleting Product Data from MongoDB

In this milestone, we focused on implementing delete functionality for product data, allowing users to remove existing product records from the database. Key achievements include:

Backend: Creating a Delete Endpoint Developed a DELETE endpoint to remove product data from MongoDB using the product ID. Used Mongoose to find and delete the product by its ID. Implemented error handling to manage scenarios where the product ID does not exist.

Frontend: Delete Button and Request Handling Added a Delete button to each product card. Clicking the Delete button sends a request to the delete endpoint with the product ID. Implemented a confirmation dialog to ensure users intend to delete the product. Updated the product list dynamically to remove the deleted product without refreshing the page.

UI and UX Enhancements Provided feedback on successful or failed delete operations. Enhanced the user experience with a clean and responsive UI for managing product deletions.


---

# Milestone 15 - Navbar Component

### Learning Goals 
By completing this milestone, we have:
- Created a reusable Navbar component.
- Integrated the Navbar into all pages of the application.
- Ensured smooth navigation between pages.
- Made the Navbar responsive for all screen sizes.


---

# Milestone 16 - Product Info Page

## Project Overview 
This milestone focuses on creating a product info page that displays all product details, allows users to select a quantity, and includes an "Add to Cart" button.

## Learning Goals 
By completing this milestone, I have learned:
- How to create a new page to display product details.
- How to add a quantity selection feature.
- How to implement an "Add to Cart" button.


---

# Milestone 17: Cart Functionality

## Overview

In this milestone, we implemented the cart functionality by creating a schema to store products in the cart and an API endpoint to receive and store product details.

## Achievements


* **Created Cart Schema:**
    * Designed a Mongoose schema to store cart items.
    * Included product details like name, price, quantity, and user reference.
* **Implemented API Endpoint:**
    * Developed a route to add products to the cart.
    * Handled requests to store product details in MongoDB.
* **Database Integration:**
    * Ensured cart items are stored and retrieved efficiently using MongoDB Atlas.
* **Code Pushed to GitHub:**
    * All changes have been committed and pushed to the repository.

---


# Milestone 18: Cart Functionality - Backend Endpoint

## Overview

This milestone focuses on developing the backend functionality required for the cart page. Specifically, we implemented an endpoint to receive requests from the cart page and retrieve all the products within a user's cart using their email address. This enhances the user experience by allowing them to view their selected items.

## Learning Goals

* Create an endpoint to receive requests from the cart page.
* Develop a backend endpoint to fetch all products inside the cart using the user's email.
* Understand the implementation of cart functionality in a backend system.

## Implementation Details

* **Endpoint Creation:**
    * A new endpoint was created to handle requests from the cart page.
    * This endpoint is designed to accept user email as a parameter.
* **Data Retrieval:**
    * Upon receiving a request, the backend retrieves the user's cart data from the database using the provided email.
    * The endpoint then fetches all the product details corresponding to the items in the user's cart.
    * The endpoint returns the product details in a JSON format.
* **Error Handling:**
    * Basic error handling was implemented to manage scenarios where the user's cart is empty or the user does not exist.

---


#  Milestone 19: Designing a Component for Your Entity

##  Project Overview
This milestone focuses on building a **cart page UI** and implementing functionality to **increase and decrease product quantity** using backend endpoints.

## 🎯 Learning Goals
By the end of this milestone, I have:
- Created a **cart frontend page** that displays products inside the cart.
- Added **+ and - buttons** to update product quantity.
- Built **backend endpoints** to increase and decrease product quantity.

---

# Ecommerce-Follow-Along

## Milestone 20 - Profile Page & Backend Endpoint

### Overview
In this milestone, we developed a profile page frontend and created a backend endpoint to retrieve and display user data. The profile page includes user details such as profile photo, name, email, and addresses.

### Learning Goals 🎯
By completing this milestone, we:
- Created a backend endpoint to fetch user data.
- Designed a frontend profile page to display user details.
- Implemented sections for profile photo, name, and email.
- Added an address section with an "Add Address" button.
- Displayed a "No address found" message when no addresses are available.

---

# Milestone 21: Address Input Form

## 🌟 Introduction
Welcome to Milestone 21! In this milestone, we are focusing on creating a frontend form for address input. You will learn how to build a form that captures user information such as country, city, address1, address2, zip code, and address type.

## 🎯 Learning Goals
By the end of this milestone, you will be able to:

- Create a frontend form that takes address input from users.
- Capture and store input values such as country, city, address1, address2, zip code, and address type.
- Implement state management to store and manage address input values.
- Implement navigation so that when a user clicks "Add Address" on their profile, they are taken to this address input form.

---

# Milestone 22: Backend Endpoint for Storing Address

## Overview

This milestone focuses on creating a backend endpoint that will receive an address from the frontend, then store it inside the user profile in the database. The backend will handle the request and add the address to the user's address array in the user collection.

## Learning Goals 🎯

- Understand how to create an endpoint to receive data from the frontend.
- Learn how to store received data inside a database.
- Add the address to the user's address array in the database.



---

# Milestone 23: Implementing Order Placement Functionality

## Overview

This milestone focuses on enhancing our e-commerce application by implementing the order placement functionality. We've added a "Place Order" button to the cart, created a select address page, and defined the product schema for orders in the backend.

## Learning Goals

-   Add a "Place Order" button to the cart page.
-   Create a "Select Address" page to display and select delivery addresses.
-   Develop a backend endpoint to retrieve user addresses.
-   Define a Mongoose schema for storing order details.

---
#  Milestone 24: Order Confirmation Page

## Description

This milestone focuses on implementing the order confirmation page in our React application. We've added functionality to display the products being ordered, the selected delivery address, and the total cart value. Users can now review their order details before finalizing their purchase by clicking the "Place Order" button.

## Learning Goals

-   Create an order confirmation page.
-   Display ordered products.
-   Display the selected delivery address.
-   Display the total cart value.
-   Implement a "Place Order" button.

---

# Milestone 25: Backend Endpoint for Place Order

## Overview

In this milestone, we focused on creating a backend endpoint that allows users to place orders. This involved receiving product, user, and address details, retrieving the user's `_id` using their email, and storing order details in the MongoDB order collection.

## Learning Goals

-   Create a backend endpoint that handles order placement.
-   Retrieve user information based on their email.
-   Store order details in a MongoDB collection using a defined schema.

---




## Milestone 26: Implementing 'update' and 'delete' an entity in React app (v3) - Backend Endpoint for User Orders

**Objective:** To create a backend endpoint that retrieves all orders for a specific user based on their email.

**Learning Goals:**

* Understand how to create a backend endpoint that filters data based on user email.
* Learn how to retrieve user ID from their email.
* Implement logic to fetch and return all orders associated with a user's ID.

---

# Milestone 27: My Orders Page

## Overview

This milestone focuses on creating a frontend page to display a user's order history. We will fetch order data from the backend endpoint created in the previous milestone and present it in a user-friendly format.

## Learning Goals

-   Create a frontend page for displaying user orders.
-   Send a GET request to the `/my-orders` endpoint with the user's email.
-   Display the fetched order data.
-   Add a navigation link to the "My Orders" page in the navbar.


---

# Follow-along Project: Online Bookstore - Milestone 28: Adding Order Cancellation

## Learning Goals 🎯

By the end of this milestone, users will be able to cancel their placed orders through the "My Orders" page.

## Implementation Details 📝

This milestone focuses on adding the functionality to cancel existing orders.


---
# Follow-along Project: Online Bookstore - Milestone 29: Integrating PayPal Payment Gateway

## Learning Goals 🎯

By the end of this milestone, we will have laid the groundwork for integrating online payments into our application using the PayPal API. We will learn how to set up a PayPal developer account and obtain the necessary credentials.

## Implementation Details 📝

This milestone focuses on the initial steps required to integrate the PayPal payment gateway. The following actions were taken:

1.  **PayPal Developer Account Setup:**
    * A PayPal developer account has been created (or accessed if already existing) through the [PayPal developer dashboard](https://developer.paypal.com/).

2.  **Sandbox Account Creation:**
    * Within the PayPal developer dashboard, a sandbox account has been created. Sandbox accounts are essential for testing payment integrations without using real money.

3.  **Sandbox User ID Retrieval:**
    * The User ID of the created sandbox account has been copied and saved securely. This ID might be needed for certain API interactions.

4.  **Client ID Retrieval:**
    * The Client ID associated with the application within the sandbox environment has been copied and saved securely. This Client ID will be used to identify our application when interacting with the PayPal API.

5.  **Order Confirmation Page Update:**
    * The order confirmation page has been modified to include two payment options for the user:
        * **Cash on Delivery (COD)**
        * **Online Payment**
    * Radio buttons have been implemented to allow the user to select their preferred payment method.

6.  **Conditional PayPal Button Display:**
    * Logic has been added to the order confirmation page such that when the "Online Payment" radio button is selected, the PayPal payment buttons will be displayed. The actual implementation and functionality of these buttons will be addressed in the next milestone.
----

---
Milestone 30: PayPal Payment Integration & Navigation Enhancements
In this milestone, we successfully integrated PayPal for seamless online payments and improved the application's navigation.

Key Highlights:

PayPal Integration: Configured a sandbox account, installed react-paypal-js, and implemented PayPal's API for secure transactions.
Navigation Component: Built a responsive Nav component with React Router for smooth navigation across key pages (Home, My Products, Add Product, Cart).
Responsive Design: Used CSS Flexbox and media queries to ensure adaptability across all screen sizes, with a hamburger menu for mobile users.


---

Milestone: Implementing Global State Management with Redux
In this milestone, we focused on integrating Redux to manage user email globally, ensuring seamless state management across the application.

Key Achievements:

State Management: Configuring Redux Store

Installed the react-redux NPM package to enable centralized state management.
Created a new store folder containing:
store.js: Configured the Redux store with a userReducer to handle the global email state.
userActions.js: Defined a setEmail action to update the email in the global state.
Integration with React Application

Wrapped the App component inside the Provider component in index.js, passing the store as a prop to ensure global access to the email state.

---

# Milestone 32: Global State Management with Redux for Mail

## Overview

In this milestone, we focused on implementing global state management for user email addresses using Redux. This allows us to store the email after login and access it across all pages of our application.

## Learning Goals

-   Understand how to use Redux to store and access global state.
-   Implement Redux dispatch to store data in the global state.
-   Utilize Redux useSelector to retrieve data from the global state in different components.

---

## Milestone 33: JWT Token & Cookie Storage  

## ✅ Tasks Completed  
Installed jsonwebtoken package using NPM.  
Used sign() method to generate a JWT token with email and user ID.  
Set maxAge to define token expiration time.  
Stored the JWT token inside a cookie in the response.

---

### Milestone 34: Validating JWT Token from Cookie
- Implemented functionality to extract the JWT token from the browser cookie on the client-side.
- Modified client-side code to send the JWT token to the server for authentication.
- Developed a middleware function on the backend to validate the received JWT token.
- Integrated the middleware into relevant routes to ensure user authentication before accessing protected pages.
- Updated the application to prevent unauthenticated users from accessing specific pages.

---

### Milestone 35: Deploying the Application
- Deployed the backend application to a chosen deployment service (e.g., Heroku, Netlify Functions, AWS).
- Obtained the deployed backend URL.
- Updated the frontend application to replace all instances of `localhost` with the deployed backend URL.
- Deployed the frontend application to a chosen deployment service (e.g., Netlify, Vercel, GitHub Pages).
- Verified that both the frontend and backend deployments are working correctly and communicating with each other.
- Ensured the complete deployed website is functional.

