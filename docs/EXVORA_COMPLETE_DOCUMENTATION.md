# Exvora — Comprehensive System Documentation

**Version**: 1.0.0 Production Ready  
**Project**: Exvora Campus Resource & Opportunities Network  
**Target Community**: SRM Institute of Science and Technology (SRMIST)  
**Word Document (.docx)**: `Exvora_Project_Documentation.docx` (in root directory)

---

## 1. Executive Summary & Problem Statement

### The Problem
Every college has a large amount of unused value sitting within its student community. Students have textbooks they no longer need from prior semesters, electronic components (Arduinos, sensors, hubs, cables) they rarely use, event tickets they cannot attend, notes and study material they want to share, skills they can teach, and items they are willing to give away.

### Core Value Proposition
> **"What you have could be exactly what someone needs."**  
> *Exchange resources, skills, study material, and event passes with your campus community.*

---

## 2. Comprehensive Resource & Technology Stack

### A. Frontend Framework & Architecture
- **Next.js 15.1.7 (App Router)**: Hybrid static rendering across 29 static and dynamic routes, server components, API route handlers, and streaming `<Suspense>` wrappers.
- **React 19.0.0 & TypeScript**: Strict compile-time typing across all entities (`Listing`, `CampusRequest`, `CampusEvent`, `EventBooking`, `ExchangeProposal`, `ExvoraUser`).
- **Tailwind CSS 3.4.17**: Responsive design system featuring brand colors: Deep Navy (`#0A2540`), Electric Blue (`#2563EB`), Emerald (`#10B981`), Cyan (`#06B6D4`), Pink (`#EC4899`), and Warm Gold (`#F59E0B`).
- **Lucide React Icons**: Consistent vector iconography for categories, badges, locations, and security indicators.

### B. 3D Graphics & Cartoon Visual Engine
- **Three.js WebGL Engine (`components/Hero3DVisual.tsx`)**: Interactive central core with dual interlocking polyhedron, orbital exchange rings, floating category satellite nodes, point lighting, particle field, and mouse-follow parallax.
- **3D Cartoon Vector Engine (`lib/cartoon-images.ts`)**: Procedural 3D cartoon SVGs for Textbooks, Cyber Security, Electronics, Notes, Fest Passes, Skill Bots, and Giveaway Gift Boxes.
- **DiceBear Bottts Avatar API**: 3D cartoon robot avatars generated per student profile (Krishna, Aarav, Diya, Rohan, Ananya, and custom registered accounts).

### C. Data Persistence & Security
- **Hot-Reload Global Store (`lib/db/index.ts`)**: In-memory database store (`globalThis.__exvora_db`) maintaining state across hot-reloads with repository pattern (`UsersDB`, `ListingsDB`, `RequestsDB`, `EventsDB`, `ExchangesDB`).
- **Jose JWT & HttpOnly Cookies (`lib/auth/session.ts`)**: HS256 signed JWT cookies for session persistence with zero-assumption institutional OIDC / PKCE S256 security boundaries.

---

## 3. AI Systems & Agentic Engineering Used

### A. Google DeepMind Antigravity Agentic Coding Architecture
- **Planning Mode & Artifact Governance**: Structured architectural design documents (`implementation_plan.md`) and progress walkthroughs (`walkthrough.md`).
- **Zero-Assumption Institutional Compliance**: Strict AI policy preventing the fabrication of unverified university authentication credentials, ensuring safe mock student simulation paired with production-ready OIDC standards.
- **Automated Full-Loop Verification**: Continuous compilation testing via `next build`, type checking, and end-to-end flow validation scripts.

### B. AI 3D Computational Geometry & Shader Design
- AI-assisted mathematical formulation for Three.js WebGL rendering, calculating continuous orbital node rotations (cos/sin angular velocities), dampening mouse parallax vectors, and rendering smooth gradient materials on parametric meshes.

---

## 4. Plugins, MCP Servers & Custom Skills Used

### A. Plugins Utilized
- **`modern-web-guidance-plugin`**: Modern HTML5/CSS3 standards, container queries, backdrop filter specifications, and accessible modal patterns.
- **`chrome-devtools-plugin`**: Accessibility (a11y) auditing, Largest Contentful Paint (LCP) performance optimization, and memory leak diagnosis.
- **`firebase-plugin`**: Authentication best practices, token expiration handling, and scalable cloud database patterns.
- **`android-cli-plugin` & `science-plugin`**: Development ecosystem toolchains and secure API credential handling.

### B. Model Context Protocol (MCP) Servers
- **`StitchMCP` Server**: UI/UX screen generation, design system maintenance, and responsive viewport verification.

### C. Specialized Agent Skills
- **`modern-web-guidance`**: Adherence to latest Web APIs, Glassmorphism, and responsive modal transitions.
- **`a11y-debugging`**: High-contrast color ratios, semantic HTML buttons and inputs, and accessible keyboard navigability.

---

## 5. Complete Feature Inventory & Route Matrix

| Route | Feature Area | Description |
|---|---|---|
| `/` | **Homepage** | Interactive 3D WebGL hero canvas, 'What can I find / share' dual pillars, 6 category cards, campus events spotlight, live mesh items, and open requests. |
| `/explore` | **Explore Marketplace** | Keyword search across real items, category filtering, mode pills, and direct exchange proposal drawer. |
| `/events` | **Campus Events & Passes** | Campus box office for Milan, HackSRM, CTF, and workshops. Features real-time seat availability, transparent INR ticket pricing, and 3D digital entry pass generation with QR code check-in. |
| `/requests` | **Campus Requests Board** | Dedicated 'I Need' requests board with urgency levels and interactive 'I Can Help / I Have This' offer drawer. |
| `/requests/new` | **Post a Request** | Form to broadcast an urgent resource or mentor need to the campus. |
| `/share` | **4-Step Share Flow** | Category Picker -> Details & Skill Topics -> Live Card Preview -> 3D Success Confirmation. |
| `/login` | **Student Access Portal** | Two-tab authentication system featuring 1-click verified student accounts (including Krishna - Cyber Security 2nd Year) and custom account registration with 3D bot avatar selector. |
| `/my-exchanges` | **Activity Hub** | Received barter offers, active shared listings, and sent proposals. |

---

## 6. How to Run the Application

```bash
# 1. Start Development Server
npm run dev
# Opens at http://localhost:3000

# 2. Run Production Build Check
npm run build
# Compiles all 29 static and dynamic routes cleanly
```
