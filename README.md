# Cinematic Portfolio | Rahul Shaw

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-FF69B4?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

A high-performance, cinematic portfolio application built with the latest modern web technologies. This project showcases a deep focus on backend-heavy MERN development, scalable systems, and interactive AI integration.

## 🚀 Key Features

- **Cinematic UI/UX**: Dark-themed, high-fidelity design with glassmorphism, gradient borders, and smooth entrance animations.
- **AI Recruiter Assistant**: Integrated Gemini 1.5 Flash AI assistant to answer questions about my professional background and skills.
- **Dynamic Skill Directory**: Interactive categorization of engineering tools, frameworks, and workflows with staggered reveal animations.
- **Responsive Engineering**: Fully optimized for mobile, tablet, and desktop views with a dedicated side-drawer navigation.
- **Performance Optimized**: Built with Next.js 16 and React 19 for rapid page loads and fluid transitions.
- **Type Safety**: End-to-end TypeScript implementation for robust and maintainable code.

## 🛠️ Tech Stack

### Core
- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Language**: TypeScript

### Styling & Animation
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion
- **Icons**: Lucide React

### AI Integration
- **LLM**: Gemini 2.5 Flash
- **SDK**: Google Generative AI SDK (`@google/genai`)

## 📂 Project Structure

```text
src/
├── app/              # Page routes, global styles, and API handlers
├── components/       # UI Components
│   ├── layout/       # Structural (Navbar, Footer)
│   ├── sections/     # Homepage sections (Hero, Stack, Projects)
│   └── shared/       # Reusable UI elements (Modals)
├── data/             # Centralized content management
└── types.ts          # TypeScript interface definitions
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- NPM or Yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CODER-RAHUL9038/rahulshaw-portfolio.git
   cd rahulshaw-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Build & Deployment

To create a production build:
```bash
npm run build
```

The application is optimized for deployment on platforms like Vercel or Netlify.

## 🤝 Contact

**Rahul Shaw** - Full-Stack MERN Engineer
- **GitHub**: [@CODER-RAHUL9038](https://github.com/CODER-RAHUL9038)
- **LinkedIn**: [rahulshaw-dev](https://www.linkedin.com/in/rahulshaw-dev)
- **Email**: [rahulshaw903866@gmail.com](mailto:rahulshaw903866@gmail.com)

---
*Built with ❤️ using the Next.js 16 + React 19 Ecosystem.*
