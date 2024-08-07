# Chat App

## Introduction
Welcome to the Chat App! This application allows users to chat with each other in real-time. It includes features like real-time online/offline status, personal account management, an admin page for viewing all user information, a search functionality to find users. The app is responsive and works on all devices. Security is enhanced using Redis to prevent brute-force attacks.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Visuals](#visuals)
- [Setup Instructions](#setup-instructions)
- [Technical Details](#technical-details)
- [Features](#features)
- [License](#license)

## Technologies Used
### Frontend
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
- ![Styled Components](https://img.shields.io/badge/Styled--Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
- ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
- ![Redux Toolkit](https://img.shields.io/badge/Redux--Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
- ![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)
- ![Toastify](https://img.shields.io/badge/Toastify-FFAA00?style=for-the-badge&logo=toastify&logoColor=white)

### Backend
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
- ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
- ![Postgres](https://img.shields.io/badge/Postgres-336791?style=for-the-badge&logo=postgresql&logoColor=white)
- ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
- ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
- ![REST API](https://img.shields.io/badge/REST%20API-02569B?style=for-the-badge&logo=rest-api&logoColor=white)
- ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
- ![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

## Visuals
### User Page
<img width="1503" alt="userpage" src="https://github.com/user-attachments/assets/7a20a96f-2e25-4d47-9f97-ec30c2dda03a">

### Responsive
<img width="699" alt="responsive" src="https://github.com/user-attachments/assets/a3c57306-68ef-4697-93e9-6ff4d7f8ce39">


### Admin Page
<img width="1507" alt="adminPage" src="https://github.com/user-attachments/assets/b59ed6a0-d5bc-47dc-bfb0-36083091b511">


### User Profile Page (User is able to change profile picture)
<img width="1511" alt="accountPage" src="https://github.com/user-attachments/assets/a97ba96f-a372-42db-b32e-e7ca7f69f900">


### SignUp Page
<img width="1504" alt="signupPage" src="https://github.com/user-attachments/assets/41c8248a-45bd-4f59-a75d-6e9314780621">


### Sign in Page (Redis Server Lock is used to prevent brute force attacks on multiple invalid password attempts)
<img width="1501" alt="redisLock, signin" src="https://github.com/user-attachments/assets/804487ca-1632-4b48-a0a3-c42213e9354c">


## Setup Instructions
### Frontend
The frontend app is already published on Netlify, so you can access it directly:
- [Chat App on Netlify](https://chat-app-x.netlify.app)

If you prefer to run it locally, follow these steps:
1. Clone the repository:
    ```sh
    git clone git@github.com:burakerdgn1/chat-app.git
    ```
2. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Start the development server:
    ```sh
    npm start
    ```

### Backend
#### For macOS and Windows:
1. Install Docker Desktop from the [link](https://docs.docker.com/desktop/install/mac-install/).

#### For Linux:
1. Download the Docker Compose binary:
    ```sh
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    ```
2. Give permission to the binary file:
    ```sh
    sudo chmod +x /usr/local/bin/docker-compose
    ```
3. Verify the installation:
    ```sh
    docker-compose --version
    ```

#### Common Steps:
1. Ensure you are in the server directory:
    ```sh
    cd server
    ```
2. Run the Docker Compose command:
    ```sh
    docker-compose up --build
    ```
3. Start the Docker Daemon:
    ```sh
    sudo systemctl start docker
    ```
4. Run the Docker Compose command:
    ```sh
    docker-compose up --build
    ```
## Technical Details

### Frontend
- **Modern React Approach:** The frontend is built using the latest features of React, including hooks and functional components.
- **Modular Project Structure:** The project follows a modular structure, making it easy to maintain and scale.
- **Custom Hooks:** Custom hooks are used to encapsulate reusable logic and improve code readability.
- **Styled Components:** All styling is done using styled-components, ensuring a consistent look and feel across the app.
- **Responsive Design:** The app is fully responsive, ensuring it works seamlessly on all devices.
- **State Management:** Redux and Redux Toolkit are used for efficient state management.
- **Routing:** React Router is used for client-side routing.
- **Real-time Updates:** Socket.IO is used for real-time communication.
- **Notifications:** Toastify is used for non-blocking notifications and alerts.

### Backend
- **Class-based Structure:** The backend is structured using classes, promoting code reuse and readability.
- **Modular Project Structure:** The project is organized into modules, making it easy to manage and scale.
- **Raw SQL Queries:** Instead of using an ORM, raw SQL queries are used for database interactions, giving more control over the database operations.
- **TypeScript:** TypeScript is used to provide static type-checking, making the code more robust and maintainable.
- **REST API:** The backend exposes a REST API for the frontend to communicate with. This API follows RESTful principles and allows CRUD operations on user data.
- **JWT Authentication:** JSON Web Tokens (JWT) are used for secure authentication.
- **Redis for Security:** Redis is used to prevent brute-force attacks by locking accounts after multiple failed login attempts.
- **Docker:** The backend is containerized using Docker, ensuring consistency across different environments.
- **WebSocket:** Socket.IO is used for real-time communication between the server and clients.
- **Environment Variables:** Configuration is managed using environment variables for better security and flexibility.
  
## Features
- **Real-Time Messaging:** Chat with other users in real-time.
- **Online/Offline Status:** See which users are online or offline in real-time.
- **User Search:** Search for users in the search area.
- **Personal Account Page:** View and update personal information, including profile photo.
- **Admin Page:** Admin user can see detailed information of all users.
- **Responsive Design:** Works on all devices.
- **Security:** Redis is used to prevent brute-force attacks.

## Default Admin User
There is a default admin user in the system:
- **Email:** admin@example.com
- **Password:** Admin123*
  
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
