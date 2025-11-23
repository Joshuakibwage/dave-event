# 🎟️ Event Platform

A modern platform to **create, manage, and showcase events** seamlessly.

## ✨ Overview
The Event Platform simplifies everything around event publishing and visibility. Organizers can create events, upload images, track engagement, and guide attendees through a clean user experience.

## 🚀 Features

### 🔹 Core Functionality
- Dynamic homepage displaying upcoming events
- Detailed event pages (slug-based)
- REST API routes for CRUD operations
- Cloudinary-powered image uploads
- Engagement + performance analytics
- Fully responsive UI

### 🔹 Event Detail Pages
- Date, venue, host & schedule
- High-quality featured images
- CTA to register
- Recommended similar events

## 🧱 Tech Stack
- **Next.js 14 – App Router**
- **React**
- **TailwindCSS**
- **Prisma ORM**
- **Mongo db**
- **Cloudinary**

## ⚙️ Installation

### Requirements
- Node.js 18+
- npm or yarn

### Clone & Install Dependencies

### Clone & Run
```bash
git clone https://www.github.com/Joshuakibwage/dave-event/
cd dave-event
npm install
npm run dev
```

### Environment Variables
```env
NEXT_PUBLIC_BASE_URL=
DATABASE_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Visit: `http://localhost:3000`

## ▶️ Running the App

### Development Mode
```bash
npm run dev
```
Runs the Next.js 16 development server.

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

The app will run using your optimized production build.

## 📁 Folder Structure
```
app/
  api/
    events/
  events/
  dashboard/
components/
lib/
utils/
```

## 🗺️ Roadmap
- Ticket payments
- Email notifications
- Admin dashboards
- AI event recommendations
- Filtering + categories
- Sponsors section

## 🤝 Contributing
Pull requests welcome.

## 👤 Author
Built with vision by **Joshua Kibwage**.
