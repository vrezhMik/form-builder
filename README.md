# 🧱 Form Builder (Client + Server + Mongo)

A full-stack form builder application that lets users visually build dynamic forms with various input types (text, number, select, checkbox), arrange their layout with drag-and-drop, and preview them in real time.

The app consists of:

- **Frontend**: React + TypeScript (with Redux, DnD Kit)
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB
- **Shared Types**: Used across client and server via `@shared` alias
- **Dockerized**: One command to run everything

---

## ✨ Features

- Drag-and-drop form layout builder
- Customizable field settings (label, width, required, etc.)
- Dynamic input types: text, number, select, checkbox
- Shared TypeScript interfaces between frontend and backend
- Form persistence in MongoDB
- Single-click form submission
- Fully Dockerized (MongoDB, server, client)

---

## 📦 Tech Stack

| Layer     | Tech                         |
| --------- | ---------------------------- |
| Frontend  | React, TypeScript, Redux     |
| Drag/Sort | DnD Kit                      |
| Backend   | Node.js, Express, TypeScript |
| Database  | MongoDB                      |
| Styling   | Tailwind CSS                 |
| Dev Tools | Docker, Docker Compose       |

---

## 🚀 Getting Started

You can either run the project with **Docker** or **manually**.

---

## 🐳 Docker Setup (Recommended)

### Prerequisites:

- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

### 👉 Run everything:

```bash
docker-compose up --build
```
