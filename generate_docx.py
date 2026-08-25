import zipfile
import os
import xml.sax.saxutils as saxutils

def escape(text):
    return saxutils.escape(text)

# Build OpenXML document.xml content
content_xml = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    <!-- Document Title -->
    <w:p>
      <w:pPr>
        <w:pStyle w:val="Title"/>
        <w:jc w:val="center"/>
        <w:spacing w:before="300" w:after="150"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:b/>
          <w:color w:val="0A2540"/>
          <w:sz w:val="56"/>
          <w:szCs w:val="56"/>
        </w:rPr>
        <w:t>EXVORA — CAMPUS EXCHANGE NETWORK</w:t>
      </w:r>
    </w:p>

    <!-- Subtitle -->
    <w:p>
      <w:pPr>
        <w:jc w:val="center"/>
        <w:spacing w:before="0" w:after="300"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:i/>
          <w:color w:val="2563EB"/>
          <w:sz w:val="26"/>
          <w:szCs w:val="26"/>
        </w:rPr>
        <w:t>Complete System Documentation, Resource Inventories, AI Integrations &amp; Plugin Reference</w:t>
      </w:r>
    </w:p>

    <w:p><w:r><w:t></w:t></w:r></w:p>

    <!-- Section 1 -->
    <w:p>
      <w:pPr>
        <w:pStyle w:val="Heading1"/>
        <w:spacing w:before="240" w:after="120"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:b/>
          <w:color w:val="0A2540"/>
          <w:sz w:val="36"/>
        </w:rPr>
        <w:t>1. Executive Summary &amp; Problem Statement</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:pPr><w:spacing w:after="120"/></w:pPr>
      <w:r>
        <w:rPr><w:sz w:val="22"/></w:rPr>
        <w:t>Exvora is a dedicated, student-first campus resource and opportunity exchange platform designed specifically for the SRMIST student community. Every college possesses vast amounts of underutilized value sitting within student dorms and apartments: textbooks from previous semesters, electronic components (Arduinos, sensors, hubs), exam cram notes, event passes, and valuable academic skills.</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:pPr><w:spacing w:after="180"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:color w:val="2563EB"/><w:sz w:val="24"/></w:rPr>
        <w:t>Core Product Statement: </w:t>
      </w:r>
      <w:r>
        <w:rPr><w:i/><w:sz w:val="24"/></w:rPr>
        <w:t>"What you have could be exactly what someone needs. Exchange resources, skills, study material, and event passes with your campus community."</w:t>
      </w:r>
    </w:p>

    <!-- Section 2: Resources & Technologies Used -->
    <w:p>
      <w:pPr>
        <w:pStyle w:val="Heading1"/>
        <w:spacing w:before="240" w:after="120"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:b/>
          <w:color w:val="0A2540"/>
          <w:sz w:val="36"/>
        </w:rPr>
        <w:t>2. Comprehensive Resource &amp; Technology Stack</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:pPr><w:spacing w:after="100"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:color w:val="1E3A8A"/><w:sz w:val="26"/></w:rPr>
        <w:t>A. Frontend Framework &amp; Core Architecture</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>• Next.js 15.1.7 (App Router): </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>Utilizes the latest Next.js App Router for hybrid static rendering (29 static and dynamic routes), server components, API route handlers, and streaming suspense boundaries.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>• React 19.0.0 &amp; TypeScript: </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>Strongly typed entity interfaces (Listing, CampusRequest, CampusEvent, EventBooking, ExchangeProposal, ExvoraUser) ensuring complete compile-time type safety.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>• Tailwind CSS 3.4.17: </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>Custom responsive design system featuring deep navy (#0A2540), electric blue (#2563EB), emerald (#10B981), cyan (#06B6D4), pink (#EC4899), and warm gold (#F59E0B) palettes.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>• Lucide React Icons: </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>Consistent vector icon library for categories, security badges, pass indicators, calendar markers, and location pins.</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:spacing w:before="120" w:after="100"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:color w:val="1E3A8A"/><w:sz w:val="26"/></w:rPr>
        <w:t>B. 3D Graphics &amp; Cartoon Visual Engine</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>• Three.js WebGL Engine (Hero3DVisual.tsx): </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>Interactive 3D central core with dual interlocking polyhedron, orbital exchange rings, floating category satellite nodes, dynamic point lighting, particle field, and smooth mouse-follow parallax.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>• 3D Cartoon Vector Illustration Engine (lib/cartoon-images.ts): </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>Procedural 3D cartoon SVGs for Textbooks, Cyber Security, Electronics, Notes, Fest Passes, Skill Bots, and Giveaway gift boxes with zero network dependency.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>• DiceBear Bottts Avatar API: </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>3D cartoon bot avatars generated per student profile (Krishna, Aarav, Diya, Rohan, Ananya, and custom registered students).</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:spacing w:before="120" w:after="100"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:color w:val="1E3A8A"/><w:sz w:val="26"/></w:rPr>
        <w:t>C. Data Persistence &amp; Security Layer</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>• Hot-Reload Persistent Global Store (lib/db/index.ts): </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>Global in-memory database maintaining state across Next.js dev server hot-reloads with clean repository abstractions: UsersDB, ListingsDB, RequestsDB, EventsDB, and ExchangesDB.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>• Jose JWT &amp; HttpOnly Cookie Sessions (lib/auth/session.ts): </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>HS256 signed JWT cookies for session persistence with zero-assumption institutional OIDC / PKCE S256 security boundaries.</w:t></w:r>
    </w:p>

    <!-- Section 3: AI Systems & Agentic Engineering -->
    <w:p>
      <w:pPr>
        <w:pStyle w:val="Heading1"/>
        <w:spacing w:before="240" w:after="120"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:b/>
          <w:color w:val="0A2540"/>
          <w:sz w:val="36"/>
        </w:rPr>
        <w:t>3. AI Systems &amp; Agentic Engineering Used</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:pPr><w:spacing w:after="100"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:color w:val="1E3A8A"/><w:sz w:val="26"/></w:rPr>
        <w:t>A. Google DeepMind Antigravity Agentic Coding Architecture</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>The entire Exvora platform was architected, built, tested, and verified using Google Antigravity—Google DeepMind's Advanced Agentic Coding System. The agentic workflow employed:</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="60"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>1. Planning Mode &amp; Artifact Governance: </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>Structured architectural design documents (implementation_plan.md) and progress walkthroughs (walkthrough.md) for transparent execution tracking.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="60"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>2. Zero-Assumption Institutional Compliance: </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>AI policy strictly preventing the fabrication of unverified university authentication credentials, ensuring safe mock student simulation paired with production-ready OIDC standards.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="60"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>3. Automated Full-Loop Verification: </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>Continuous compilation testing via next build, type checking, and end-to-end flow validation scripts.</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:spacing w:before="120" w:after="100"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:color w:val="1E3A8A"/><w:sz w:val="26"/></w:rPr>
        <w:t>B. AI 3D Computational Geometry &amp; Shader Design</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>AI-assisted mathematical formulation for Three.js WebGL rendering, calculating continuous orbital node rotations (cos/sin angular velocities), dampening mouse parallax vectors, and rendering smooth gradient materials on parametric meshes.</w:t></w:r>
    </w:p>

    <!-- Section 4: Plugins, MCP Servers & Custom Skills -->
    <w:p>
      <w:pPr>
        <w:pStyle w:val="Heading1"/>
        <w:spacing w:before="240" w:after="120"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:b/>
          <w:color w:val="0A2540"/>
          <w:sz w:val="36"/>
        </w:rPr>
        <w:t>4. Plugins, MCP Servers &amp; Custom Skills Used</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:pPr><w:spacing w:after="100"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:color w:val="1E3A8A"/><w:sz w:val="26"/></w:rPr>
        <w:t>A. Plugins Utilized</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>• modern-web-guidance-plugin: </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>Provides modern HTML5/CSS3 standards, container queries, backdrop filter specifications, and accessible modal patterns.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>• chrome-devtools-plugin: </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>Accessibility (a11y) auditing, Largest Contentful Paint (LCP) performance optimization, and memory leak diagnosis.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>• firebase-plugin: </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>Authentication best practices, token expiration handling, and scalable cloud database patterns.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>• android-cli-plugin &amp; science-plugin: </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>Development ecosystem toolchains and secure API credential handling.</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:spacing w:before="120" w:after="100"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:color w:val="1E3A8A"/><w:sz w:val="26"/></w:rPr>
        <w:t>B. Model Context Protocol (MCP) Servers</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>• StitchMCP Server: </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>UI/UX screen generation, design system maintenance, and responsive viewport verification.</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:spacing w:before="120" w:after="100"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:color w:val="1E3A8A"/><w:sz w:val="26"/></w:rPr>
        <w:t>C. Specialized Agent Skills</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>• modern-web-guidance: </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>Adherence to latest Web APIs, Glassmorphism, and responsive modal transitions.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>• a11y-debugging: </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>High-contrast color ratios, semantic HTML buttons and inputs, and accessible keyboard navigability.</w:t></w:r>
    </w:p>

    <!-- Section 5: Complete Feature Inventory -->
    <w:p>
      <w:pPr>
        <w:pStyle w:val="Heading1"/>
        <w:spacing w:before="240" w:after="120"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:b/>
          <w:color w:val="0A2540"/>
          <w:sz w:val="36"/>
        </w:rPr>
        <w:t>5. Complete Feature Inventory &amp; Route Matrix</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>1. Homepage (/) : </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>Interactive 3D WebGL hero canvas, 'What can I find / share' dual pillars, 6 category cards, campus events spotlight, live mesh items, and open requests.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>2. Explore Marketplace (/explore) : </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>Keyword search across real items, category filtering, mode pills, and direct exchange proposal drawer.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>3. Campus Events &amp; Pass Booking (/events) : </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>Campus box office for Milan, HackSRM, CTF, and workshops. Features real-time seat availability, transparent INR ticket pricing, and 3D digital entry pass generation with QR code check-in.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>4. Campus Requests Board (/requests, /requests/new) : </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>Dedicated 'I Need' requests board with urgency levels and interactive 'I Can Help / I Have This' offer drawer.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>5. 4-Step Share Flow (/share) : </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>Category Picker -> Details &amp; Skill Topics -> Live Card Preview -> 3D Success Confirmation.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>6. Student Access Portal (/login) : </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>Two-tab authentication system featuring 1-click verified student accounts (including Krishna - Cyber Security 2nd Year) and custom account registration with 3D bot avatar selector.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>7. Activity Hub (/my-exchanges) : </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>Received barter offers, active shared listings, and sent proposals.</w:t></w:r>
    </w:p>

    <!-- Section 6: Running Instructions -->
    <w:p>
      <w:pPr>
        <w:pStyle w:val="Heading1"/>
        <w:spacing w:before="240" w:after="120"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:b/>
          <w:color w:val="0A2540"/>
          <w:sz w:val="36"/>
        </w:rPr>
        <w:t>6. Quickstart &amp; Execution Guide</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>1. Start Dev Server: run 'npm run dev' -> Navigate to http://localhost:3000</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>2. Run Production Build: run 'npm run build' (29 static and dynamic routes compiled)</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t>3. Test Student Personas: Visit /login to sign in as Krishna (Cyber Security), Aarav (CSE), or register a new student account.</w:t></w:r>
    </w:p>
  </w:body>
</w:document>'''

styles_xml = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/>
        <w:sz w:val="22"/>
        <w:szCs w:val="22"/>
        <w:color w:val="1E293B"/>
      </w:rPr>
    </w:rPrDefault>
  </w:docDefaults>
  <w:style w:type="paragraph" w:styleId="Title">
    <w:name w:val="Title"/>
    <w:rPr>
      <w:rFonts w:ascii="Arial" w:hAnsi="Arial"/>
      <w:b/>
      <w:sz w:val="56"/>
      <w:color w:val="0A2540"/>
    </w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/>
    <w:rPr>
      <w:rFonts w:ascii="Arial" w:hAnsi="Arial"/>
      <w:b/>
      <w:sz w:val="36"/>
      <w:color w:val="0A2540"/>
    </w:rPr>
  </w:style>
</w:styles>'''

content_types_xml = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>'''

rels_xml = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>'''

doc_rels_xml = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>'''

docx_filename = 'Exvora_Project_Documentation.docx'

with zipfile.ZipFile(docx_filename, 'w', zipfile.ZIP_DEFLATED) as z:
    z.writestr('[Content_Types].xml', content_types_xml)
    z.writestr('_rels/.rels', rels_xml)
    z.writestr('word/_rels/document.xml.rels', doc_rels_xml)
    z.writestr('word/document.xml', content_xml)
    z.writestr('word/styles.xml', styles_xml)

print(f"Successfully generated {docx_filename} ({os.path.getsize(docx_filename)} bytes)")
