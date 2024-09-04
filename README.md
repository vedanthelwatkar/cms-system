# Client and User Management System

## Overview

This web application allows for the management of clients and users with full CRUD operations, admin controls, and API integration. It features real-time updates, an admin panel, and generates Management Information System (MIS) reports with visual representations of success and error metrics.

## Features

- **Client Management:**

  - Create, read, update, and delete clients.
  - Form validation and API integration for client operations.

- **User Management:**

  - Add, view, edit, and delete users associated with clients.
  - Input validation and real-time updates.

- **Admin Control:**

  - Admin role with full access to manage clients and users.
  - Real-time data refresh for affected users.

- **API Integration:**

  - Fetch and display data from an external API.
  - Refresh data functionality.

- **MIS Reporting:**
  - Generate and visualize success and error metrics.
  - Daily, weekly, and monthly summaries with export options (PDF, Excel).

## Technologies

- **Frontend:** React.js, Material-UI, Redux
- **Backend:** Node.js, Express.js, MySQL/PostgreSQL
- **Reporting:** react-chartjs-2

## Setup

1. Clone the repository: `git clone <repo-url>`
2. Install dependencies:
   - **Frontend:** `cd client && npm install`
   - **Backend:** `cd server && npm install`
3. Configure environment variables and database settings.
4. Run the application:
   - **Frontend:** `npm start`
   - **Backend:** `npm start`

## Deployment

- Deployed on [(https://dashboard-cms-seven.vercel.app/)]

## Demo

- [[Video demo link](https://github.com/user-attachments/assets/89287614-827b-4f10-8c03-974fa69804ad)]

## Evaluation

- **Functionality:** Complete CRUD operations, real-time updates, and reporting.
- **Code Quality:** Clean and well-structured code.
- **UI/UX:** Intuitive interface and clear messaging.
- **Performance:** Efficient handling of API calls and data updates.
