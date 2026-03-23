# Smart Queue Management System

A modern, full-stack web application designed to digitize physical waiting lines. This system provides real-time token tracking, live crowd estimation, and automated voice announcements, replacing traditional crowded waiting rooms with a seamless digital experience.

**[Live Demo](https://smart-queue-system-navy.vercel.app/)** | **[Backend API](https://smart-queue-pro-3z4j.onrender.com)**

## Features

* **Real-Time Polling:** The display board updates automatically within seconds when the Admin calls the next token, using optimized client-server polling.
* **Live Wait Time Estimation:** Dynamically calculates how many people are ahead of you and estimates your wait time based on average service speeds.
* **Automated Voice Announcements:** Integrates the browser's native Web Speech API to physically announce "Now serving token number X" when the queue updates.
* **Smart Crowd Prediction:** Uses server-side logic to estimate if the current crowd level is Low, Medium, or High based on time-of-day traffic.
* **Premium Glassmorphism UI:** Features a fully responsive, modern pastel aesthetic with soft shadows, unified card layouts, and cross-browser CSS support.

## Tech Stack

**Frontend:**
* React.js (Hooks, React Router)
* Custom CSS (Modern Glassmorphism & WebKit compatibility)
* Hosted on **Vercel**

**Backend:**
* Node.js
* Express.js (REST API, CORS)
* Hosted on **Render**

## Architecture & Data Flow

This application utilizes a decoupled Client-Server architecture:
1. **Client (React):** Users book a token via the `/` route. The Admin controls the queue via the `/admin` route.
2. **Server (Express):** Processes the `POST /book` request, calculates the next token, and stores the queue state.
3. **Synchronization:** The `/display` route pings the server (`GET /status`) every 3 seconds to fetch the live token. If the state changes, it triggers the Web Speech API.

## Run Locally

To run this project on your own machine:

1. ## Clone the repository:
   ```bash
   git clone [https://github.com/DebadritaSaha/smart-queue-system.git](https://github.com/DebadritaSaha/smart-queue-system.git)
