# RevYou  
*Your career, reviewed. Capture and showcase authentic feedback that sets you apart.*  

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%2019-blue?logo=react" alt="React 19"/>
  <img src="https://img.shields.io/badge/UI-Chakra%20UI-teal?logo=chakraui" alt="Chakra UI"/>
  <img src="https://img.shields.io/badge/Backend-Node%2018%2B-green?logo=nodedotjs" alt="Node.js 18+"/>
  <img src="https://img.shields.io/badge/Framework-Express-black?logo=express" alt="Express"/>
  <img src="https://img.shields.io/badge/Database-MongoDB-lightgreen?logo=mongodb" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Auth-Auth0-orange?logo=auth0" alt="Auth0"/>
  <img src="https://img.shields.io/badge/Status-In%20Progress-orange" alt="Project Status"/>
  <img src="https://img.shields.io/badge/License-Proprietary-red" alt="License"/>
</p>


---

## 🛑 Problem  
In today’s job market, skills and experience alone aren’t enough.  
- Careers are fluid — people move between jobs, projects, and industries faster than ever.  
- Feedback fades quickly once projects end or teams change.  
- LinkedIn recommendations exist, but they’re vague, scarce, and tied to one platform.  
- Employers and clients increasingly expect **proof, not just claims**.  

Professionals lack a structured, portable way to capture and showcase authentic, project-specific feedback.  

---

## 💡 Solution  
RevYou is a feedback-driven portfolio platform that helps you:  
- **Capture real-time feedback** while it’s still fresh.  
- **Organise insights** into Campaigns (companies, clients, or organisations) and Projects (roles, assignments, collaborations).  
- **Build a shareable profile** of authentic testimonials that highlight your strengths, growth, and achievements.  
- **Stand out in a world of AI-generated CVs** by showcasing the human element — real feedback from real people.  

Whether you’re a developer, freelancer, teacher, student, or volunteer, RevYou helps you:  
1. Showcase your strengths with authentic, verifiable feedback.  
2. Spot growth opportunities through constructive insights.  
3. Bring your CV to life with a dynamic story of your career journey.  

---

## ⏳ Why Now?  
Work has never been more dynamic:  
- Projects end quickly, teams are fluid, and careers span multiple industries.  
- AI makes it easy to generate polished CVs and cover letters — making it harder to stand out.  
- Proof and testimonials are now standard in consumer products and services, but not in careers.  

RevYou fills that gap, giving professionals a **human-first portfolio of feedback** at the moment it’s needed most.  

---

## ✨ Key Features
- **Create Campaigns & Projects** to organise your work.
- **Send feedback requests** to colleagues, clients, or team members.
- **Public share links** for specific projects or campaigns.
- **Auth0-powered authentication** for secure access.
- **Structured data storage** in MongoDB Atlas.

---

## Tech Stack

**Frontend (FE)**
- React + Vite
- Chakra UI
- Auth0 React SDK

**Backend (API)**
- Node.js + Express
- MongoDB Atlas (Mongoose)
- Auth0 JWT validation (`express-oauth2-jwt-bearer`)
- Swagger UI (dev only)
- Jest + Supertest (integration tests in progress)

**Other**
- Docker / docker-compose (deployment)
- Cross-env (env handling for scripts)

---

## 🔍 How It Works (User Journey)
1. **Sign Up** with Auth0 (Google, email/password, etc.).
2. **Create a Campaign** to group related work.
3. **Add Projects** under the campaign.
4. **Send feedback requests** via unique links.
5. **Share your feedback profile** with recruiters or clients.

---

## Monorepo Structure

    MA-PROJECT-1/                              # Root of the monorepo
    ├── API/                             # Backend (Express.js + MongoDB Atlas)
    │   ├── middleware/                  # Auth & other middleware functions
    │   ├── models/                      # Mongoose models
    │   ├── public/                      # Public assets
    │   ├── routes/                      # Express route definitions
    │   ├── services/                    # Business logic & database queries
    │   ├── tests/                       # Jest/Supertest backend tests
    │   ├── .dockerignore                 # Files to exclude from Docker build
    │   ├── .env.example                  # Example environment variables for setup
    │   ├── .gitignore                    # Git ignore rules
    │   ├── app.js                        # Express app instance (no server start)
    │   ├── docker-compose.yml            # Docker Compose config for production
    │   ├── Dockerfile                    # Backend Docker build instructions
    │   ├── index.js                      # Server entry point (connects DB, starts app)
    │   ├── jest.config.js                # Jest configuration for backend tests
    │   ├── package.json                  # Backend package definitions & scripts
    │   ├── swagger.js                    # Swagger autogen script
    │
    ├── FE/                               # Frontend (React + Auth0 SPA)
    │   ├── public/                       # Public assets (favicon, index.html)
    │   ├── src/
    │   │   ├── assets/                   # Static images, icons, etc.
    │   │   ├── auth/                     # Auth wrapper components
    │   │   ├── components/               # Reusable UI components
    │   │   ├── contexts/                 # React Context providers
    │   │   ├── layouts/                  # Page layout components
    │   │   ├── pages/                    # Main page components
    │   │   ├── services/                 # API call functions
    │   │   ├── utils/                    # Utility/helper functions
    │   │   ├── App.css                   # Global styles for the React app
    │   │   ├── App.jsx                   # Root React component
    │   │   ├── index.css                 # Base/global styles
    │   │   ├── main.jsx                  # React app entry point
    │   │   ├── router.jsx                # React Router configuration
    │   ├── package.json                  # Frontend package definitions & scripts
    │
    ├── .gitignore                        # Monorepo ignore rules
    ├── package.json                      # Root package.json (workspace/dependency mgmt)
    ├── README.md                         # Project documentation

---

## Key API Endpoints (current)

> Full docs available at **/api/v1/docs** (Swagger) when `NODE_ENV=development`.

| Method | Endpoint                                 | Auth | Description                                                           |
|-------:|------------------------------------------|:----:|-----------------------------------------------------------------------|
|  GET   | `/api/v1/users/me`                       | ✅   | Get current user profile (by Auth0 `sub`)                             |
|  POST  | `/api/v1/users/sync`                     | ✅   | Create user if not exists; otherwise return existing user             |
| PATCH  | `/api/v1/users/me/update-profile`        | ✅   | Update user profile (allowed fields: `email`, `firstName`, `lastName`, `username`) |
|  POST  | `/api/v1/campaigns`                      | ✅   | Create new campaign                                                   |
|  GET   | `/api/v1/campaigns/user/:userId`         | ✅   | Get campaigns created by a specific user                              |
|  GET   | `/api/v1/campaigns/campaign/:campaignId` | ✅   | Get campaign by ID                                                     |
|  GET   | `/api/v1/campaigns/link/:linkUuid`       | ❌   | Get campaign by public link (no auth required)                        |
| PATCH  | `/api/v1/campaigns/save-feedback`        | ❌   | Save feedback for a campaign via a public link                        |
|  GET   | `/api/v1/shareable-profiles/:userId`     | ❌   | Get aggregated shareable profile content for a specific user          |

---

## 🚧 Work in Progress
RevYou is an active project with ongoing development. Current priorities include:
- Expanding backend test coverage (Jest + Supertest).
- Enhancing the user interface and overall UX (landing page, visual polish).
- Adding advanced features such as analytics and richer profile-sharing options.

---

## 🌐 Deployment
- **Frontend:** Netlify  
- **Backend:** IONOS VPS (Dockerised)  
- **Database:** MongoDB Atlas  
This setup ensures scalability, uptime, and ease of iteration.

---

## Credits

RevYou was developed as part of a collaborative project.  
- **Oleg Novikov** – Full-stack development (ongoing)
- **Robert McIsaac** – Full-stack development (ongoing)
- **Max Joseph** – Early-stage contributions  
- **Frankie Pike** – Early-stage contributions  
- **Magyar-Hunor Tamas** – Product vision & requirements
- **Becks Hookham** – Facilitation, project coordination

## License

This project is currenty proprietary and not licensed for public use, copying, or distribution.