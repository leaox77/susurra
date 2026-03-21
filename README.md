# Susurra — Guía de setup

## Stack
React + Vite · Tailwind CSS · Framer Motion · Supabase · Claude API (Haiku) · jsPDF

---

## 1. Clonar e instalar

```bash
git clone <tu-repo>
cd susurra
npm install
```

---

## 2. Variables de entorno

```bash
cp .env.example .env
```

Completa el `.env` con los valores de tu proyecto Supabase:

```
VITE_SUPABASE_URL=https://XXXXXXXX.supabase.co
VITE_SUPABASE_ANON_KEY=eyXXXXXXXXXXXX
```

**¿Dónde los encuentro?**
→ supabase.com → tu proyecto → Settings → API → Project URL y anon key

---

## 3. Configurar Supabase

### a) Habilitar Anonymous Auth
→ Authentication → Providers → Anonymous Sign-ins → **Enable**

### b) Ejecutar el schema SQL
→ SQL Editor → New query → pegar todo el contenido de `susurra_supabase_schema.sql` → Run

---

## 4. Desplegar la Edge Function

```bash
# Instalar Supabase CLI si no lo tienes
npm install -g supabase

# Login
supabase login

# Vincular al proyecto
supabase link --project-ref <tu-project-ref>

# Agregar la API key de Claude como secreto
supabase secrets set CLAUDE_API_KEY=sk-ant-XXXXXXXXXX

# Desplegar la función
supabase functions deploy susurra-chat
```

**¿Dónde obtengo la Claude API key?**
→ console.anthropic.com → API Keys → Create Key

---

## 5. Correr en desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

---

## 6. Build para producción

```bash
npm run build
```

Despliega la carpeta `dist/` en **Vercel**:
- Conecta el repo de GitHub
- Agrega las variables de entorno en Vercel Dashboard
- Deploy automático en cada push a `main`

---

## Estructura del proyecto

```
susurra/
├── src/
│   ├── components/
│   │   ├── ui/          # Button, Badge
│   │   ├── chat/        # DiagnosisCard
│   │   └── layout/      # AppShell (nav, header)
│   ├── pages/           # Home, Chat, Learn, Game, Contact, History
│   ├── hooks/           # useAuth, useChat
│   ├── lib/             # supabase.js, api.js, claude.js, pdf.js
│   ├── store/           # useSessionStore (Zustand)
│   └── styles/          # globals.css
├── supabase/
│   └── functions/
│       └── susurra-chat/ # Edge Function → Claude API
├── .env.example
├── tailwind.config.js
└── vite.config.js
```

---

## Para Capacitor (app móvil)

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
npx cap init Susurra com.susurra.app
npm run build
npx cap add android
npx cap sync
npx cap open android
```
