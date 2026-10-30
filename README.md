# FKC Legal - Frontend Portal & Architecture

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Fast-yellow.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Hosted-Vercel-black.svg)](https://vercel.com/)

The client-facing web application and secure administrative management portal for FKC Legal, engineered for high performance, dynamic responsiveness, and seamless integration with cloud-hosted backend services.

---

##  Tech Stack & Core Technologies
* **Framework:** React powered by Vite for rapid bundling and hot module replacement
* **Styling & Theme:** Tailwind CSS with custom branding (`fkcBlack`, `fkcGold`), Lucide Icons, and dark/light mode support
* **Mapping & Location:** React-Leaflet / Leaflet.js for interactive global and regional network visualization
* **HTTP Client:** Axios and Fetch API for asynchronous backend communication
* **Hosting & Deployment:** Continuously deployed via Vercel

---

## High-Level Architecture & How It Works

The FKC Legal frontend follows a modular component-driven architecture designed to separate public-facing advisory touchpoints from restricted administrative management workflows.

### 1. Dynamic API Communication
* **Environment-Driven Routing:** Utilizes build-time environment variables (`VITE_API_URL`) to dynamically route API calls to the production Render backend or local development servers.
* **Service Modules:** Encapsulates API requests for client onboarding, contact submissions, academy registrations, and M-Pesa payment status polling.

### 2. Client Portals & Interactive Workflows
* **Inquiry & Service Forms:** Structured components capturing client data (General, Diplomat, and Academy Enquiries) with real-time validation and error handling.
* **Interactive Regional Presence:** Integrates map controllers and custom markers via React-Leaflet to dynamically render and transition across global office locations and collaboration hubs in Africa and beyond.

### 3. Secure Administrative Management Dashboard
* **Protected Routes:** Restricts access to management views using token-based authentication (JWT via SimpleJWT).
* **Metrics & Analytics:** Aggregates real-time data feeds from the backend to display service request counts, fulfillment status, and revenue tracking across practice areas.