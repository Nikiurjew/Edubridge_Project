# Grocery Management System (Mega Mart)

## Description
The Grocery Management System (Mega Mart) is a comprehensive full-stack application designed to streamline the management of grocery store operations. This system facilitates inventory tracking, sales processing, customer management, and reporting functionalities. The project leverages modern web technologies to provide a robust, efficient, and user-friendly platform for grocery store owners and employees.

## Technologies Used
- **Backend:** Spring Boot, Java Hibernate
- **Database:** MySQL
- **Frontend:** Angular

## Features
- **Inventory Management:** Track and manage grocery items, including stock levels, prices, and categories.
- **Sales Processing:** Efficiently handle sales transactions, generate invoices, and manage discounts.
- **Customer Management:** Maintain customer records, track purchase history, and manage loyalty programs.
- **Reporting:** Generate comprehensive reports on sales, inventory, and customer activities.
- **User Authentication:** Secure login and registration for employees with role-based access control.

## Project Structure
/backend
└── src/main/java/com/mega/mart
├── controller
├── model
├── repository
├── service
└── MegaMartApplication.java
/frontend
└── src/app
├── components
├── services
├── models
└── app.module.ts
/database
└── schema.sql

## Installation
### Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/nikiurjew/grocery-management-system.git
2. Navigate to the backend directory:
   cd grocery-management-system/backend

3.Configure the database connection in "application.properties":
spring.datasource.url=jdbc:mysql://localhost:3306/mega_mart
spring.datasource.username=root
spring.datasource.password=yourpassword

4.Run the Spring Boot application:
mvn spring-boot:run
### Frontend

1.Navigate to the frontend directory:
cd ../frontend

2.Install the dependencies:
npm install

3.Start the Angular application:
ng serve



