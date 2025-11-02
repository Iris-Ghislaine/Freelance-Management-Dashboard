# Freelance Management Dashboard

A modern, type-safe freelance management dashboard built with React, TypeScript, and Tailwind CSS. Manage your clients, projects, and payments with a beautiful, responsive interface.

## Features

- **Client Management** - View and organize all your clients with contact information
- **Project Tracking** - Track project status, budget, and payment status in real-time
- **Payment History** - Complete payment records with amounts and dates
- **Smart Filtering** - Filter projects by status, payment state, or search by title
- **Dashboard Statistics** - At-a-glance metrics showing totals, paid/unpaid counts, and revenue
- **Type-Safe Architecture** - Full TypeScript implementation with discriminated unions and Context API
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

## Technologies Used

- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Context API + useReducer** - Global state management
- **Lucide React** - Beautiful, consistent icons
- **Vite** - Lightning-fast build tool

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd freelance-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173` (or the URL shown in terminal)

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/           # Reusable React components
│   ├── ClientCard.tsx   # Individual client display
│   ├── ProjectList.tsx  # Project list with actions
│   ├── PaymentList.tsx  # Payment history table
│   ├── DashboardStats.tsx # Statistics cards
│   └── FilterSection.tsx # Search and filter controls
├── context/             # Global state management
│   └── AppContext.tsx   # Context API + useReducer setup
├── types/               # TypeScript type definitions
│   └── index.ts         # All interfaces and unions
├── utils/               # Helper functions
│   └── helpers.ts       # Data manipulation and formatting
├── App.tsx              # Main application component
├── index.css            # Global styles with Tailwind
└── main.tsx             # Entry point
```

## Screenshots
<img width="1536" height="872" alt="image" src="https://github.com/user-attachments/assets/7a2eae38-210b-480f-b515-172ce9fe7da9" />

<img width="1514" height="880" alt="image" src="https://github.com/user-attachments/assets/61d027ed-9cb8-482a-908d-cb7e7bf70eb9" />

<img width="1390" height="714" alt="image" src="https://github.com/user-attachments/assets/6ac89b35-2cd9-40f0-ad28-53af13849707" />

### Managing Payments

- Click **"Mark as Paid"** on any unpaid project
- This automatically records a payment entry
- Updates the project status in real-time

### Filtering & Searching

- **Search Box** - Find projects by title
- **Status Filter** - Show pending, in-progress, or completed projects
- **Payment Filter** - Show only paid or unpaid projects

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
npm run typecheck # Check TypeScript types
```

## Styling

The project uses **Tailwind CSS** for styling. If you don't see styles:

1. Stop the dev server (Ctrl+C)
2. Clear cache: `rm -rf node_modules package-lock.json`
3. Reinstall: `npm install`
4. Run: `npm run dev`
5. Hard refresh browser (Ctrl+Shift+R)

## Component Overview

### ClientCard
Displays individual client information with icons and optional email.

### ProjectList
Shows all projects with:
- Project title and linked client
- Status badges (pending, in-progress, completed)
- Payment status (paid, unpaid)
- Budget amount
- "Mark as Paid" action button

### PaymentList
Table view of payment history with:
- Project name and ID
- Payment amount
- Payment date

### DashboardStats
Five statistics cards showing:
- Total projects
- Total budget
- Paid project count
- Unpaid project count
- Total payments received

### FilterSection
Search and filter controls for finding specific projects.

## Performance
- Built with Vite for fast development and production builds
- Type-safe code prevents runtime errors
- Efficient Context API usage with useReducer
- Optimized Tailwind CSS bundle (~14KB gzipped)

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)


## Support

For issues or questions, please check:
1. Browser console for error messages
2. Ensure all dependencies are installed
3. Try clearing cache and rebuilding
4. Check that Node.js version is compatible


