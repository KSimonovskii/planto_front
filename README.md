# Planto — E-commerce Platform for Kibbutz Nir Oz (MVP)

### [Project Status: Functional Prototype / Archived]

## Context
Planto is a volunteer initiative developed to support **Kibbutz Nir Oz** following the events of October 7th, 2023. The goal was to build a functional online plant nursery to help restore the local community's business operations. 

The project reached the MVP (Minimum Viable Product) stage and was presented to the stakeholders to determine the future roadmap. As the project was intended to be community-driven and did not receive further feedback for production scaling, it is currently maintained as a high-fidelity technical prototype.

##Tech Stack
* **Frontend:** TypeScript, React, Tailwind CSS.
* **State Management:** Redux Toolkit, RTK Query.
* **Backend:** Java Spring Boot.
* **Database:** MongoDB.
* **Key Libraries:** `@tanstack/react-table`, `@tanstack/react-virtual` (for high-performance UI).

## My Contribution & Key Features

I served as a Full-stack Developer, focusing on the core Administrative Dashboard and Product Management systems.

### Frontend (Admin Panel):
* **High-Performance Tables:** Developed a universal, reusable table component using `TanStack Table` and `React Virtual`. It supports rendering thousands of products without performance degradation.
* **Advanced Data Interaction:** Implemented **inline editing**, **infinite scrolling**, and complex **filtering/sorting** logic to ensure a smooth administrative experience.
* **State Management:** Architected the frontend data flow using **RTK Query** for efficient caching and synchronization with the backend.

### Backend:
* **RESTful API:** Developed controllers and services for managing products and user data.
* **NoSQL Integration:** Integrated with **MongoDB** to handle flexible product schemas.

## Key Engineering Highlights
* **UX Focus:** Implementation of "focus-on-edit" patterns and instant feedback loops during data updates.
* **Scalability:** The table architecture is designed to handle large datasets through row virtualization and optimized Redux selectors.
* **Clean Code:** Heavy use of TypeScript interfaces and modular architecture to ensure the project could be easily handed over or expanded.

## Lessons Learned
This project was a great exercise in building a functional prototype under time constraints while addressing real-world community needs. It allowed me to bridge my 15+ years of enterprise experience with a modern full-stack ecosystem (Java/Spring + React/TS).
