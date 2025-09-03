# Trading Dashboard Frontend

Built with the help of v0.app to streamline development and deployment.

A sleek, modern frontend for a trading dashboard—powered by Next.js, TypeScript, Tailwind CSS, and deployed on Vercel. 

## Project Overview

This frontend is the UI layer for trading-dashboard-backend found at https://github.com/aryapratham000/trading-dashboard-backend, with:

- **React and TypeScript (via Next.js)** for high-performance and type safety.
- **Tailwind CSS** for utility-first styling.
- Hosted on **Vercel**, ensuring global accessibility and fast updates.

## Features

- **Top Row Dashboard** → Displays important **daily levels** and a **market sentiment gauge**, providing a quick snapshot of the market’s directional bias.  
<img width="600" alt="Top Row Dashboard" src="https://github.com/user-attachments/assets/c407c537-6ab6-484a-83ed-826e956680be" />

- **Analytics Card** → Shows the **predicted range** and **current range**, as well as the **time remaining until the next session**.  
<img width="600" alt="Analytics Card" src="https://github.com/user-attachments/assets/c71988a7-1592-4200-86ad-ebcd89b60e7c" />

- **Regime Probabilities** → Presents probabilities of different session regimes. Each entry has an **info tooltip** (`i`) you can hover over for detailed definitions of the sessions.  
<img width="600" alt="Regime Probabilities" src="https://github.com/user-attachments/assets/7f84bdaf-7ce0-4fbe-ae85-2efd1a7e4a02" />

- **Events** → Dynamically compiled using regime probabilities, giving a **powerful directional alignment tool** to interpret current and upcoming market events.  
<img width="600" alt="Events" src="https://github.com/user-attachments/assets/8c4ab189-817a-4a29-859c-f03c9fbf76c4" />

- **Filters** → Allow you to add **nuance and precision** to the analytics, tailoring the view to your specific trading approach.  
<img width="600" alt="image" src="https://github.com/user-attachments/assets/ef06b965-2bef-4d1f-9c2f-7622a8877066" />

- **Market Status Overlay** → If the market is closed, an overlay is shown with a countdown to the next open, ensuring users know live data will resume when trading starts.  
<img width="600" alt="Market Status Overlay" src="https://github.com/user-attachments/assets/cc612430-eeb4-43f0-be4f-f84949dcb765" />

## File Structure Breakdown

Here’s how the repository is organized:
- **app/** → Next.js main app directory (pages, layout, routes)  
- **components/** → Reusable UI components (e.g. badges, charts, menus)  
- **lib/** → Utility functions, hooks, and shared logic  
- **public/** → Static assets (images, icons, favicon)  
- **styles/** → Global and component-specific CSS/Tailwind configs  
- **.gitignore** → Files and folders to be excluded from version control  
- **.npmrc** → NPM configuration (registry, package manager prefs)  
- **components.json** → UI component metadata (perhaps generated or used by v0.app)  
- **next.config.mjs** → Next.js configuration file for routing/build tweaks  
- **package.json** → Project metadata, scripts, and dependencies  
- **package-lock.json** → Exact dependency versions used in the project  
- **postcss.config.mjs** → PostCSS configuration for Tailwind processing  
- **tsconfig.json** → TypeScript compiler settings and path aliases  
- **README.md** → Project overview (this file)  

