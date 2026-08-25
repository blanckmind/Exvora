/**
 * 3D Cartoon Style Visual Assets for Exvora
 * Designed with vibrant clay gradients, soft 3D shading, floating elements, and isometric depth.
 */

function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}

export const CARTOON_SVGS = {
  cybersecurity: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
      <defs>
        <linearGradient id="bgCyber" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="50%" stop-color="#1e1b4b"/>
          <stop offset="100%" stop-color="#090d16"/>
        </linearGradient>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06b6d4"/>
          <stop offset="50%" stop-color="#3b82f6"/>
          <stop offset="100%" stop-color="#1d4ed8"/>
        </linearGradient>
        <linearGradient id="goldKey" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a"/>
          <stop offset="100%" stop-color="#f59e0b"/>
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect width="600" height="400" fill="url(#bgCyber)"/>
      <circle cx="300" cy="200" r="160" fill="#3b82f6" opacity="0.15" filter="url(#glow)"/>
      <!-- 3D Clay Floating Shield -->
      <path d="M300 70 L410 120 C410 240 300 320 300 320 C300 320 190 240 190 120 Z" fill="url(#shieldGrad)" filter="url(#glow)" stroke="#67e8f9" stroke-width="6"/>
      <path d="M300 95 L385 135 C385 230 300 295 300 295 C300 295 215 230 215 135 Z" fill="#0f172a" opacity="0.4"/>
      <!-- 3D Lock Centerpiece -->
      <rect x="260" y="180" width="80" height="65" rx="18" fill="url(#goldKey)" stroke="#d97706" stroke-width="4"/>
      <path d="M275 180 V155 C275 140 325 140 325 155 V180" fill="none" stroke="url(#goldKey)" stroke-width="12" stroke-linecap="round"/>
      <circle cx="300" cy="205" r="7" fill="#78350f"/>
      <rect x="297" y="208" width="6" height="14" fill="#78350f"/>
      <!-- Floating Crypto Spheres -->
      <circle cx="150" cy="110" r="28" fill="#10b981" opacity="0.85" filter="url(#glow)"/>
      <circle cx="450" cy="280" r="22" fill="#ec4899" opacity="0.85" filter="url(#glow)"/>
      <circle cx="470" cy="110" r="18" fill="#f59e0b" opacity="0.85"/>
      <text x="300" y="365" fill="#38bdf8" font-size="20" font-family="system-ui, sans-serif" font-weight="900" text-anchor="middle" letter-spacing="3">CYBER DEFENSE</text>
    </svg>
  `),

  textbooks: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
      <defs>
        <linearGradient id="bgBook" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fff7ed"/>
          <stop offset="100%" stop-color="#ffedd5"/>
        </linearGradient>
        <linearGradient id="book1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f97316"/>
          <stop offset="100%" stop-color="#c2410c"/>
        </linearGradient>
        <linearGradient id="book2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3b82f6"/>
          <stop offset="100%" stop-color="#1d4ed8"/>
        </linearGradient>
        <linearGradient id="book3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981"/>
          <stop offset="100%" stop-color="#047857"/>
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#7c2d12" flood-opacity="0.25"/>
        </filter>
      </defs>
      <rect width="600" height="400" fill="url(#bgBook)"/>
      <ellipse cx="300" cy="330" rx="160" ry="20" fill="#fed7aa" opacity="0.8"/>
      <!-- Stack of 3D Cartoon Books -->
      <g filter="url(#shadow)">
        <rect x="180" y="250" width="240" height="50" rx="14" fill="url(#book3)"/>
        <rect x="200" y="258" width="215" height="34" rx="6" fill="#f8fafc"/>
        <rect x="180" y="250" width="28" height="50" rx="10" fill="#065f46"/>
      </g>
      <g filter="url(#shadow)">
        <rect x="160" y="195" width="260" height="50" rx="14" fill="url(#book2)"/>
        <rect x="180" y="203" width="235" height="34" rx="6" fill="#f8fafc"/>
        <rect x="160" y="195" width="28" height="50" rx="10" fill="#1e3a8a"/>
      </g>
      <g filter="url(#shadow)" transform="rotate(-6 280 140)">
        <rect x="190" y="125" width="220" height="55" rx="14" fill="url(#book1)"/>
        <rect x="210" y="133" width="195" height="38" rx="6" fill="#ffffff"/>
        <rect x="190" y="125" width="30" height="55" rx="10" fill="#9a3412"/>
        <polygon points="340,125 365,125 365,195 352,180 340,195" fill="#f59e0b"/>
      </g>
      <circle cx="450" cy="110" r="16" fill="#facc15"/>
      <circle cx="150" cy="140" r="12" fill="#38bdf8"/>
    </svg>
  `),

  electronics: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
      <defs>
        <linearGradient id="bgElec" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ecfeff"/>
          <stop offset="100%" stop-color="#cffafe"/>
        </linearGradient>
        <linearGradient id="gadgetBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="50%" stop-color="#0369a1"/>
          <stop offset="100%" stop-color="#075985"/>
        </linearGradient>
        <linearGradient id="chipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981"/>
          <stop offset="100%" stop-color="#047857"/>
        </linearGradient>
        <filter id="elecShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#0891b2" flood-opacity="0.3"/>
        </filter>
      </defs>
      <rect width="600" height="400" fill="url(#bgElec)"/>
      <ellipse cx="300" cy="320" rx="170" ry="22" fill="#a5f3fc" opacity="0.9"/>
      <g filter="url(#elecShadow)">
        <rect x="180" y="120" width="240" height="150" rx="36" fill="url(#gadgetBody)"/>
        <rect x="205" y="145" width="190" height="100" rx="20" fill="#0f172a"/>
        <rect x="260" y="165" width="80" height="60" rx="12" fill="url(#chipGrad)" stroke="#34d399" stroke-width="3"/>
        <circle cx="280" cy="195" r="5" fill="#facc15"/>
        <circle cx="300" cy="195" r="5" fill="#38bdf8"/>
        <circle cx="320" cy="195" r="5" fill="#f43f5e"/>
        <rect x="165" y="155" width="15" height="30" rx="4" fill="#334155"/>
        <rect x="165" y="195" width="15" height="30" rx="4" fill="#334155"/>
        <path d="M420 195 C490 195 490 260 450 290" fill="none" stroke="#0369a1" stroke-width="14" stroke-linecap="round"/>
        <rect x="435" y="275" width="30" height="16" rx="6" fill="#f59e0b" transform="rotate(-30 450 283)"/>
      </g>
      <polygon points="140,90 150,115 130,115 145,140 135,120 155,120" fill="#f59e0b"/>
      <circle cx="470" cy="90" r="14" fill="#06b6d4"/>
    </svg>
  `),

  notes: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
      <defs>
        <linearGradient id="bgNotes" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#faf5ff"/>
          <stop offset="100%" stop-color="#f3e8ff"/>
        </linearGradient>
        <linearGradient id="folderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#a855f7"/>
          <stop offset="100%" stop-color="#7e22ce"/>
        </linearGradient>
        <filter id="noteShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#6b21a8" flood-opacity="0.25"/>
        </filter>
      </defs>
      <rect width="600" height="400" fill="url(#bgNotes)"/>
      <ellipse cx="300" cy="330" rx="160" ry="20" fill="#e9d5ff" opacity="0.8"/>
      <g filter="url(#noteShadow)">
        <rect x="170" y="110" width="260" height="180" rx="28" fill="url(#folderGrad)"/>
        <rect x="195" y="90" width="210" height="180" rx="16" fill="#ffffff"/>
        <rect x="220" y="120" width="120" height="10" rx="5" fill="#a855f7"/>
        <rect x="220" y="145" width="160" height="8" rx="4" fill="#e2e8f0"/>
        <rect x="220" y="165" width="140" height="8" rx="4" fill="#e2e8f0"/>
        <rect x="220" y="185" width="150" height="8" rx="4" fill="#e2e8f0"/>
        <rect x="330" y="195" width="60" height="60" rx="8" fill="#fef08a" transform="rotate(8 360 225)"/>
        <circle cx="230" cy="225" r="16" fill="#10b981"/>
        <path d="M222 225 L228 231 L238 219" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
      </g>
      <g transform="rotate(45 440 140)">
        <rect x="420" y="100" width="20" height="90" rx="6" fill="#f43f5e"/>
        <polygon points="420,190 440,190 430,215" fill="#fbbf24"/>
        <circle cx="430" cy="214" r="3" fill="#0f172a"/>
      </g>
    </svg>
  `),

  tickets: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
      <defs>
        <linearGradient id="bgTicket" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fdf2f8"/>
          <stop offset="100%" stop-color="#fce7f3"/>
        </linearGradient>
        <linearGradient id="ticketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ec4899"/>
          <stop offset="50%" stop-color="#db2777"/>
          <stop offset="100%" stop-color="#9d174d"/>
        </linearGradient>
        <filter id="tickShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#be185d" flood-opacity="0.3"/>
        </filter>
      </defs>
      <rect width="600" height="400" fill="url(#bgTicket)"/>
      <ellipse cx="300" cy="330" rx="160" ry="20" fill="#fbcfe8" opacity="0.8"/>
      <g filter="url(#tickShadow)" transform="rotate(-8 300 200)">
        <rect x="150" y="120" width="300" height="150" rx="28" fill="url(#ticketGrad)"/>
        <circle cx="150" cy="195" r="18" fill="#fdf2f8"/>
        <circle cx="450" cy="195" r="18" fill="#fdf2f8"/>
        <line x1="360" y1="125" x2="360" y2="265" stroke="#ffffff" stroke-width="4" stroke-dasharray="8 8" opacity="0.6"/>
        <circle cx="230" cy="195" r="38" fill="#fef08a"/>
        <polygon points="230,170 238,188 258,188 242,200 248,218 230,206 212,218 218,200 202,188 222,188" fill="#f59e0b"/>
        <rect x="290" y="170" width="50" height="10" rx="5" fill="#ffffff"/>
        <rect x="290" y="190" width="40" height="8" rx="4" fill="#fbcfe8"/>
        <rect x="385" y="160" width="40" height="70" rx="6" fill="#fbcfe8" opacity="0.4"/>
      </g>
      <circle cx="120" cy="100" r="14" fill="#facc15"/>
      <circle cx="490" cy="110" r="18" fill="#a855f7"/>
    </svg>
  `),

  skills: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
      <defs>
        <linearGradient id="bgSkill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ecfdf5"/>
          <stop offset="100%" stop-color="#d1fae5"/>
        </linearGradient>
        <linearGradient id="robotHead" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981"/>
          <stop offset="50%" stop-color="#059669"/>
          <stop offset="100%" stop-color="#047857"/>
        </linearGradient>
        <filter id="skillShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#047857" flood-opacity="0.25"/>
        </filter>
      </defs>
      <rect width="600" height="400" fill="url(#bgSkill)"/>
      <ellipse cx="300" cy="330" rx="160" ry="20" fill="#a7f3d0" opacity="0.8"/>
      <g filter="url(#skillShadow)">
        <rect x="200" y="110" width="200" height="160" rx="40" fill="url(#robotHead)"/>
        <rect x="225" y="135" width="150" height="110" rx="24" fill="#0f172a"/>
        <circle cx="265" cy="180" r="14" fill="#38bdf8"/>
        <circle cx="335" cy="180" r="14" fill="#38bdf8"/>
        <circle cx="268" cy="177" r="4" fill="#ffffff"/>
        <circle cx="338" cy="177" r="4" fill="#ffffff"/>
        <path d="M285 210 Q300 225 315 210" fill="none" stroke="#34d399" stroke-width="5" stroke-linecap="round"/>
        <rect x="293" y="70" width="14" height="45" rx="7" fill="#f59e0b"/>
        <circle cx="300" cy="65" r="18" fill="#fef08a" stroke="#d97706" stroke-width="4"/>
        <rect x="185" y="165" width="16" height="40" rx="8" fill="#047857"/>
        <rect x="399" y="165" width="16" height="40" rx="8" fill="#047857"/>
      </g>
      <text x="130" y="180" fill="#059669" font-size="52" font-family="monospace" font-weight="900">{</text>
      <text x="440" y="180" fill="#059669" font-size="52" font-family="monospace" font-weight="900">}</text>
    </svg>
  `),

  giveaway: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGift" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#eff6ff"/>
          <stop offset="100%" stop-color="#dbeafe"/>
        </linearGradient>
        <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3b82f6"/>
          <stop offset="50%" stop-color="#2563eb"/>
          <stop offset="100%" stop-color="#1d4ed8"/>
        </linearGradient>
        <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a"/>
          <stop offset="100%" stop-color="#f59e0b"/>
        </linearGradient>
        <filter id="giftShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#1e3a8a" flood-opacity="0.25"/>
        </filter>
      </defs>
      <rect width="600" height="400" fill="url(#bgGift)"/>
      <ellipse cx="300" cy="335" rx="160" ry="20" fill="#bfdbfe" opacity="0.8"/>
      <g filter="url(#giftShadow)">
        <rect x="190" y="160" width="220" height="150" rx="28" fill="url(#boxGrad)"/>
        <rect x="175" y="125" width="250" height="50" rx="18" fill="#1e40af"/>
        <rect x="280" y="125" width="40" height="185" fill="url(#ribbonGrad)"/>
        <rect x="190" y="210" width="220" height="35" fill="url(#ribbonGrad)"/>
        <path d="M260 125 C230 70 300 70 300 125" fill="url(#ribbonGrad)" stroke="#d97706" stroke-width="3"/>
        <path d="M340 125 C370 70 300 70 300 125" fill="url(#ribbonGrad)" stroke="#d97706" stroke-width="3"/>
        <circle cx="300" cy="125" r="16" fill="#fbbf24"/>
      </g>
      <circle cx="140" cy="120" r="12" fill="#ec4899"/>
      <polygon points="460,110 470,130 450,130" fill="#10b981"/>
      <circle cx="470" cy="250" r="15" fill="#f59e0b"/>
    </svg>
  `),
};

export const EVENT_CARTOON_SVGS = {
  festConcert: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
      <defs>
        <linearGradient id="bgConcert" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#18181b"/>
          <stop offset="50%" stop-color="#312e81"/>
          <stop offset="100%" stop-color="#4c1d95"/>
        </linearGradient>
        <linearGradient id="glowStars" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f43f5e"/>
          <stop offset="50%" stop-color="#fb7185"/>
          <stop offset="100%" stop-color="#facc15"/>
        </linearGradient>
        <filter id="festGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect width="600" height="400" fill="url(#bgConcert)"/>
      <circle cx="300" cy="200" r="180" fill="#6366f1" opacity="0.15" filter="url(#festGlow)"/>
      <polygon points="300,10 150,380 450,380" fill="#a855f7" opacity="0.18"/>
      <polygon points="300,10 80,380 200,380" fill="#ec4899" opacity="0.2"/>
      <polygon points="300,10 400,380 520,380" fill="#06b6d4" opacity="0.2"/>
      <ellipse cx="300" cy="340" rx="220" ry="35" fill="#09090b"/>
      <circle cx="300" cy="180" r="70" fill="#0f172a" stroke="#ec4899" stroke-width="8" filter="url(#festGlow)"/>
      <circle cx="300" cy="180" r="30" fill="url(#glowStars)"/>
      <text x="140" y="140" fill="#facc15" font-size="44" font-weight="bold">♪</text>
      <text x="440" y="160" fill="#38bdf8" font-size="52" font-weight="bold">♫</text>
      <polygon points="300,60 310,85 335,85 315,100 322,125 300,110 278,125 285,100 265,85 290,85" fill="#facc15" filter="url(#festGlow)"/>
      <text x="300" y="375" fill="#e0e7ff" font-size="22" font-family="system-ui, sans-serif" font-weight="900" text-anchor="middle" letter-spacing="4">PRO-NIGHT LIVE</text>
    </svg>
  `),

  hackathon: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
      <defs>
        <linearGradient id="bgHack" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#022c22"/>
          <stop offset="50%" stop-color="#064e3b"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
        <linearGradient id="trophyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a"/>
          <stop offset="50%" stop-color="#f59e0b"/>
          <stop offset="100%" stop-color="#d97706"/>
        </linearGradient>
        <filter id="hackGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect width="600" height="400" fill="url(#bgHack)"/>
      <circle cx="300" cy="200" r="160" fill="#10b981" opacity="0.15" filter="url(#hackGlow)"/>
      <g filter="url(#hackGlow)">
        <path d="M220 100 L380 100 C380 200 330 230 300 240 C270 230 220 200 220 100 Z" fill="url(#trophyGrad)" stroke="#b45309" stroke-width="4"/>
        <path d="M220 120 C170 120 170 180 225 180" fill="none" stroke="url(#trophyGrad)" stroke-width="12" stroke-linecap="round"/>
        <path d="M380 120 C430 120 430 180 375 180" fill="none" stroke="url(#trophyGrad)" stroke-width="12" stroke-linecap="round"/>
        <rect x="285" y="240" width="30" height="40" fill="#d97706"/>
        <rect x="240" y="280" width="120" height="35" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="3"/>
      </g>
      <text x="300" y="165" fill="#78350f" font-size="32" font-family="monospace" font-weight="900" text-anchor="middle">&lt;36H/&gt;</text>
      <circle cx="120" cy="110" r="18" fill="#34d399"/>
      <circle cx="480" cy="110" r="18" fill="#38bdf8"/>
      <text x="300" y="360" fill="#6ee7b7" font-size="20" font-family="system-ui, sans-serif" font-weight="900" text-anchor="middle" letter-spacing="3">NATIONAL HACKATHON</text>
    </svg>
  `),

  workshop: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
      <defs>
        <linearGradient id="bgWork" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#082f49"/>
          <stop offset="50%" stop-color="#0369a1"/>
          <stop offset="100%" stop-color="#0c4a6e"/>
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#bgWork)"/>
      <circle cx="300" cy="180" r="120" fill="#0284c7" opacity="0.2"/>
      <rect x="230" y="100" width="140" height="130" rx="30" fill="#f8fafc" stroke="#38bdf8" stroke-width="6"/>
      <rect x="250" y="125" width="100" height="65" rx="16" fill="#0f172a"/>
      <circle cx="280" cy="155" r="10" fill="#38bdf8"/>
      <circle cx="320" cy="155" r="10" fill="#38bdf8"/>
      <path d="M290 175 Q300 185 310 175" fill="none" stroke="#34d399" stroke-width="3" stroke-linecap="round"/>
      <circle cx="440" cy="120" r="25" fill="#f59e0b" opacity="0.8"/>
      <circle cx="160" cy="220" r="20" fill="#ec4899" opacity="0.8"/>
      <text x="300" y="360" fill="#bae6fd" font-size="20" font-family="system-ui, sans-serif" font-weight="900" text-anchor="middle" letter-spacing="3">HANDS-ON LAB</text>
    </svg>
  `),

  aarush: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
      <defs>
        <linearGradient id="bgAarush" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e1b4b"/>
          <stop offset="50%" stop-color="#3b0764"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
        <linearGradient id="orbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f43f5e"/>
          <stop offset="50%" stop-color="#8b5cf6"/>
          <stop offset="100%" stop-color="#06b6d4"/>
        </linearGradient>
        <filter id="festGlow2" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect width="600" height="400" fill="url(#bgAarush)"/>
      <circle cx="300" cy="200" r="140" fill="url(#orbGrad)" filter="url(#festGlow2)" opacity="0.4"/>
      <!-- 3D Techno-Management Sphere & Rings -->
      <circle cx="300" cy="190" r="75" fill="#0f172a" stroke="#a855f7" stroke-width="8"/>
      <ellipse cx="300" cy="190" rx="140" ry="40" fill="none" stroke="#38bdf8" stroke-width="6" transform="rotate(-25 300 190)"/>
      <ellipse cx="300" cy="190" rx="140" ry="40" fill="none" stroke="#f43f5e" stroke-width="6" transform="rotate(25 300 190)"/>
      <circle cx="300" cy="190" r="28" fill="#facc15" filter="url(#festGlow2)"/>
      <text x="300" y="365" fill="#f472b6" font-size="22" font-family="system-ui, sans-serif" font-weight="900" text-anchor="middle" letter-spacing="4">TECHNO-MANAGEMENT FEST</text>
    </svg>
  `),

  esports: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGame" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#020617"/>
          <stop offset="50%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#1e1b4b"/>
        </linearGradient>
        <linearGradient id="padGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3b82f6"/>
          <stop offset="100%" stop-color="#1d4ed8"/>
        </linearGradient>
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect width="600" height="400" fill="url(#bgGame)"/>
      <circle cx="300" cy="200" r="160" fill="#06b6d4" opacity="0.15" filter="url(#neonGlow)"/>
      <!-- 3D Game Controller -->
      <g filter="url(#neonGlow)">
        <rect x="170" y="120" width="260" height="150" rx="55" fill="url(#padGrad)" stroke="#60a5fa" stroke-width="6"/>
        <!-- Grips -->
        <path d="M170 180 L140 270 C130 295 165 315 190 280 L210 240 Z" fill="#1e3a8a"/>
        <path d="M430 180 L460 270 C470 295 435 315 410 280 L390 240 Z" fill="#1e3a8a"/>
        <!-- D-Pad -->
        <rect x="210" y="170" width="22" height="60" rx="6" fill="#0f172a"/>
        <rect x="191" y="189" width="60" height="22" rx="6" fill="#0f172a"/>
        <!-- Action Buttons -->
        <circle cx="370" cy="180" r="10" fill="#ec4899"/>
        <circle cx="400" cy="195" r="10" fill="#10b981"/>
        <circle cx="370" cy="210" r="10" fill="#facc15"/>
        <circle cx="340" cy="195" r="10" fill="#38bdf8"/>
        <!-- Joysticks -->
        <circle cx="260" cy="225" r="22" fill="#0f172a" stroke="#38bdf8" stroke-width="4"/>
        <circle cx="340" cy="225" r="22" fill="#0f172a" stroke="#ec4899" stroke-width="4"/>
      </g>
      <text x="300" y="365" fill="#38bdf8" font-size="22" font-family="system-ui, sans-serif" font-weight="900" text-anchor="middle" letter-spacing="4">E-SPORTS ARENA</text>
    </svg>
  `),

  robowars: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
      <defs>
        <linearGradient id="bgRobo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1c1917"/>
          <stop offset="50%" stop-color="#292524"/>
          <stop offset="100%" stop-color="#0c0a09"/>
        </linearGradient>
        <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f97316"/>
          <stop offset="50%" stop-color="#ea580c"/>
          <stop offset="100%" stop-color="#9a3412"/>
        </linearGradient>
        <filter id="roboGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect width="600" height="400" fill="url(#bgRobo)"/>
      <ellipse cx="300" cy="330" rx="180" ry="25" fill="#78350f" opacity="0.4"/>
      <!-- Combat Robot Chassis & Saw Blade -->
      <g filter="url(#roboGlow)">
        <!-- Heavy Wedge Body -->
        <polygon points="180,260 420,260 370,140 230,140" fill="url(#metalGrad)" stroke="#fdba74" stroke-width="6"/>
        <!-- Spinning Saw Disc -->
        <circle cx="300" cy="130" r="50" fill="#e2e8f0" stroke="#f59e0b" stroke-width="8"/>
        <circle cx="300" cy="130" r="16" fill="#0f172a"/>
        <!-- Robot Glowing Eye Slit -->
        <rect x="250" y="195" width="100" height="18" rx="8" fill="#ef4444" filter="url(#roboGlow)"/>
        <!-- Heavy Wheels -->
        <rect x="150" y="210" width="35" height="70" rx="10" fill="#0f172a" stroke="#78716c" stroke-width="4"/>
        <rect x="415" y="210" width="35" height="70" rx="10" fill="#0f172a" stroke="#78716c" stroke-width="4"/>
      </g>
      <!-- Spark Particles -->
      <polygon points="340,70 350,90 330,90" fill="#facc15"/>
      <polygon points="260,80 270,100 250,100" fill="#facc15"/>
      <text x="300" y="365" fill="#fb923c" font-size="22" font-family="system-ui, sans-serif" font-weight="900" text-anchor="middle" letter-spacing="4">COMBAT ROBOTICS</text>
    </svg>
  `),

  designFigma: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
      <defs>
        <linearGradient id="bgDesign" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#18181b"/>
          <stop offset="50%" stop-color="#27272a"/>
          <stop offset="100%" stop-color="#09090b"/>
        </linearGradient>
        <filter id="desGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect width="600" height="400" fill="url(#bgDesign)"/>
      <!-- Figma 3D Colored Pills -->
      <g filter="url(#desGlow)">
        <!-- Top Left Red -->
        <rect x="235" y="90" width="65" height="65" rx="32" fill="#f24e1e"/>
        <!-- Top Right Orange -->
        <rect x="300" y="90" width="65" height="65" rx="32" fill="#ff7262"/>
        <!-- Mid Left Purple -->
        <rect x="235" y="155" width="65" height="65" rx="32" fill="#a259ff"/>
        <!-- Mid Right Blue -->
        <circle cx="332" cy="187" r="32" fill="#1abcfe"/>
        <!-- Bottom Left Green -->
        <rect x="235" y="220" width="65" height="65" rx="32" fill="#0acf83"/>
      </g>
      <!-- Pen Tool Cursor -->
      <g transform="translate(380, 200) rotate(-45)">
        <polygon points="0,0 30,50 15,50 0,70 -15,50 0,50" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
      </g>
      <text x="300" y="365" fill="#a5b4fc" font-size="22" font-family="system-ui, sans-serif" font-weight="900" text-anchor="middle" letter-spacing="4">UI/UX DESIGN SPRINT</text>
    </svg>
  `),
};

export const CARTOON_PRESETS = [
  { label: 'Textbooks & Books', url: CARTOON_SVGS.textbooks },
  { label: 'Electronics & Hubs', url: CARTOON_SVGS.electronics },
  { label: 'Notes & Formula Sheets', url: CARTOON_SVGS.notes },
  { label: 'Event & Fest Tickets', url: CARTOON_SVGS.tickets },
  { label: 'Skills & Tutoring', url: CARTOON_SVGS.skills },
  { label: 'Free Giveaways & Gifts', url: CARTOON_SVGS.giveaway },
  { label: 'Cyber Security & Tools', url: CARTOON_SVGS.cybersecurity },
];
