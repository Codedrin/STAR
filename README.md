<!--
  Place your logo file (e.g., `logo.png`) in the root of this repository (or in an `assets/` folder).
  Update the path below if it’s located elsewhere.
-->
<p align="center">
  <img src="logo.png" alt="STAR Logo" width="200" />
</p>

# STAR (Sell, Trade And Recycle)

> **A Student-Exclusive Online Marketplace Platform for Promoting Sustainable Commerce and Entrepreneurial Growth Among BatangPreneurs at Batangas State University – TNEU.**

STAR provides a secure, student-focused space for buying and selling items (books, electronics, and other essentials) within the BatangPreneurs community. Through a strict student verification process, STAR ensures safe transactions, fair pricing, and a scam-free marketplace—helping BatStateU students achieve sustainability and financial independence.

---

## Table of Contents

1. [Demo & Screenshots](#demo--screenshots)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Installation](#installation)  
   - [Running Locally](#running-locally)  
5. [Folder Structure](#folder-structure)  
6. [Usage](#usage)  
7. [Realtime Messaging](#realtime-messaging)  
8. [Environmental Variables](#environmental-variables)  
9. [Possible Improvements](#possible-improvements)  
10. [Contributing](#contributing)  
11. [License](#license)  
12. [Contact](#contact)  

---

## Demo & Screenshots

<!--  
  You can replace these image links with actual screenshots or live demo GIFs.
  Add screenshots of the homepage, product listings, chat interface, etc.
-->
<p align="center">
  <img src="assets/screenshots/homepage.png" alt="Homepage Preview" width="600" />
</p>
<p align="center">
  <img src="assets/screenshots/chat-interface.png" alt="Realtime Chat Preview" width="600" />
</p>

---

## Features

- 🔐 **Student Verification**  
  - Strict email verification (institutional @batstateu.edu.ph) and/or S.U. ID authentication.
- 🛒 **Marketplace Listings**  
  - Create/edit/delete listings for books, electronics, clothing, and the like.  
  - Upload multiple images per item.  
  - Category filters (e.g., “Books,” “Electronics,” “Furniture,” “Miscellaneous”).
- 💬 **Realtime Chat**  
  - In-app messaging powered by Supabase Realtime.  
  - One-on-one conversations between buyer and seller.  
  - “Online/Offline” presence indicators.
- 🔍 **Search & Filters**  
  - Keyword search.  
  - Filter by category, price range, condition (New/Used).
- 🏷️ **Fair-Pricing Enforcement**  
  - Automatically flag listings priced 50%+ above average.  
  - Admin dashboard to review flagged posts.
- ⚙️ **Admin Dashboard**  
  - Approve new sellers, review flagged transactions, and manage site settings.  
  - View statistics: Active listings, total sales, daily sign-ups.
- ♻️ **Sustainability Focus**  
  - Promote recycling and reusing secondhand items.  
  - “Donate” option: Post items as free for pick-up by other students.

---

## Tech Stack

- **Frontend**  
  - [Vite](https://vitejs.dev/) (Lightning-fast build tool)  
  - [React](https://reactjs.org/) (Component-based UI)  
  - [Tailwind CSS](https://tailwindcss.com/) (Utility-first styling)  
  - [React Router v6](https://reactrouter.com/) (Client-side routing)  
  - [Axios](https://axios-http.com/) or `fetch` (HTTP client for REST calls)
- **Backend & Realtime**  
  - [Supabase](https://supabase.com/) (PostgreSQL database + Auth + Realtime)  
    - **Auth Module** for student verification (email + S.U. ID upload).  
    - **Storage** for listing images.  
    - **Realtime** for live chat messaging and presence.  
    - **PostgreSQL** tables for users, items, chats, transactions, reviews, etc.
- **Deployment**  
  - [Vercel](https://vercel.com/) (Frontend hosting)  
  - [Supabase](https://app.supabase.io/) (Managed database, storage, and serverless functions)

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 16.x  
- **npm** (comes with Node.js) or **Yarn**  
- A [Supabase](https://app.supabase.io/) account with a project created.  
  - Ensure you have your **Supabase URL** and **Anon/Public Key** handy.

---

### Installation

1. **Clone this repository**  
   ```bash
   git clone https://github.com/your-username/star-marketplace.git
   cd star-marketplace
