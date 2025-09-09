# Frontend React Test Task: Interactive Data Matrix

This project is a single-page application built with React and TypeScript that allows users to generate and interact with a numerical data matrix. It fulfills all the requirements of the test task, including dynamic calculations, interactive highlighting, and data manipulation.

**Live Demo:** [memcrab_test](https://vziko.github.io/memcrab_test/)

---

## 📝 The Task

This project was created as a test task for a Frontend Developer position. The original requirements can be found at the link below:

* **[View the original test task description](https://docs.memcrab.com/s/856a01a7-c84c-4753-98e4-ccb1e178b384)**

---

## ✨ Features

- **Dynamic Matrix Generation:** Create a matrix of any size from 0x0 to 100x100.
- **Calculated Values:** Automatically calculates the sum for each row and the 60th percentile for each column using linear interpolation.
- **Cell Increment:** Click on any cell to increase its value by 1, with immediate recalculation of all dependent sums and percentiles.
- **Nearest Value Highlighting:** Hover over a cell to highlight a user-defined number (X) of cells with the closest numerical values.
- **Row Heatmap & Percentages:** Hover over a row's sum to transform the row's values into percentages and display a color heatmap from red to green.
- **Row Manipulation:** Easily add new rows or remove existing ones.
- **Responsive UI:** The interface is clean, intuitive, and works well on different screen sizes.

---

## 🛠️ Technologies Used

- **Framework:** [React](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **State Management:** React Context API
- **Styling:** SCSS Modules
- **Linting:** ESLint

---

## 🚀 Setup and Running the Project

To run this project locally, follow these simple steps:

### 1. Install dependencies
Using npm (or your preferred package manager):
```bash
npm install
```

### 2. Run the development server
This command will start the Vite development server (usually on http://localhost:3500)
```bash
npm run dev
```

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev` — Runs the app in development mode.
- `npm run build` — Builds the app for production to the `dist` folder.
- `npm run lint` — Starts the ESLint code checker.
- `npm run preview` — Serves the production build locally to preview it.