# InvoiceKit — Frontend

> Clean, responsive UI for InvoiceKit — GST-ready Invoicing SaaS for Indian Freelancers  
> Built with HTML · CSS · JavaScript · Chart.js

[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)](https://invoicekit-frontend.vercel.app)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 🔗 Live Demo

| Service | URL |
|---------|-----|
| Frontend (Live) | [invoicekit-frontend.vercel.app](https://invoicekit-frontend.vercel.app) |
| Backend API | [invoicekit-backend.onrender.com](https://invoicekit-backend.onrender.com) |
| API Docs (Swagger) | [invoicekit-backend.onrender.com/swagger-ui.html](https://invoicekit-backend.onrender.com/swagger-ui.html) |
| Backend Repo | [github.com/jayendrakasera/invoicekit-backend](https://github.com/jayendrakasera/invoicekit-backend) |

---

## 📌 About

This is the frontend for InvoiceKit — a full-stack invoicing SaaS built for Indian freelancers and small businesses. It communicates with the Spring Boot REST API via Fetch API and renders dynamic data including revenue charts and invoice management.

---

## ✨ Pages & Features

| Page | Description |
|------|-------------|
| `index.html` | Login page with JWT auth |
| `register.html` | New user registration (Freelancer / Client) |
| `dashboard.html` | Revenue summary, paid/unpaid charts (Chart.js) |
| `clients.html` | Add, edit, delete clients with GST details |
| `invoices.html` | Create invoices with line items, GST calculation |
| `invoice-detail.html` | View invoice, download PDF, send to client |

---

## 🛠️ Tech Stack

| Technology | Usage |
|-----------|-------|
| HTML5 | Page structure and semantic markup |
| CSS3 | Responsive layout, custom styling |
| JavaScript (ES6) | Fetch API calls, DOM manipulation, JWT handling |
| Chart.js | Revenue bar chart, paid vs unpaid donut chart |

---

## 🔌 API Integration

All data is fetched from the InvoiceKit Spring Boot backend. JWT token is stored in `localStorage` and attached to every request as a Bearer token.

```javascript
// Example: Fetch all invoices
const response = await fetch(`${API_BASE}/api/invoices`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});
```

---

## 🚀 Running Locally

```bash
# Clone the repo
git clone https://github.com/jayendrakasera/invoicekit-frontend.git
cd invoicekit-frontend

# Open directly in browser (no build step needed)
open index.html

# Or use Live Server (VS Code extension) for best experience
```

> **Note:** Update the `API_BASE` constant in your JS files to point to your local backend (`http://localhost:8080`) when running locally.

---

## 📁 Project Structure

```
invoicekit-frontend/
├── index.html            → Login
├── register.html         → Registration
├── dashboard.html        → Main dashboard with charts
├── clients.html          → Client management
├── invoices.html         → Invoice list and creation
├── invoice-detail.html   → Single invoice view
├── css/
│   └── style.css         → Global styles
└── js/
    ├── auth.js           → Login/register, JWT storage
    ├── dashboard.js      → Chart.js charts, summary data
    ├── clients.js        → Client CRUD operations
    └── invoices.js       → Invoice creation, PDF download, email send
```

---

## 👨‍💻 Author

**Jayendra Kasera**  
B.Tech CSE (AI & ML) — LNCT Bhopal | Graduating 2027  
SIH 2025 Winner · Freelance Web Developer  
[GitHub](https://github.com/jayendrakasera) · [LinkedIn](https://linkedin.com/in/jayendrakasera)

---

## 📄 License

MIT License — feel free to use this project for learning or reference.
