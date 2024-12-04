# **StoresPage React App**

This project is a part of a React application that allows users to filter, sort, and search for stores. The page includes various filters such as category, alphabet, cashback, promotions, shareability, and status, which are dynamically managed through URL query parameters. The page also features a responsive design that includes a filter dropdown with an icon for smaller screens.

---

## **Table of Contents**
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Tech Stack](#tech-stack)

---

## **Features**

- **Category Selection**: Users can filter stores by category.
- **Alphabetical Sorting**: Users can select stores starting with a specific letter.
- **Cashback Filter**: Users can toggle to show only stores that offer cashback.
- **Promoted and Sharable Filters**: Users can toggle to filter promoted stores and stores that are sharable.
- **Status Filter**: Users can filter stores by their status (active, inactive, etc.).
- **Sorting**: Users can sort stores based on different parameters.
- **Responsive Design**: The page works seamlessly across all screen sizes. On smaller screens, the filters are hidden inside a dropdown that is toggled by clicking the filter icon.
- **URL Query Parameters**: All selected filters are reflected in the URL query parameters, allowing easy sharing and bookmarking of filtered search results.

---

## **Installation**

To get started with this project, you need to set up the React app. Follow the steps below:

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/storespage.git
```

### 2. Navigate to the project directory
```bash
cd storespage
```

### 3. Install dependencies
```bash
npm install
```

### 4. Start the development server
```bash
npm start
```
The application will be running at `http://localhost:3000` by default.

---

## **Usage**

Once the app is running, you can interact with the following elements:

- **Filters**:
  - The filter icon allows users to toggle a dropdown menu that contains various filters (Alphabet, Cashback, Status, Promoted, Sharable).
  - Filters can be applied to refine the stores list.
  
- **Store List**:
  - Stores are displayed based on the selected filters, with options to sort them.
  
- **Search Term**:
  - The app takes a `searchTerm` prop that filters stores based on the search query.

---

## **Folder Structure**

The project follows a basic folder structure for a React application:

```
/src
  /Components
    /Filters
      AlphabetFilter.js
      CashbackFilter.js
      IsPromotedFilter.js
      IsSharableFilter.js
      StatusFilter.js
    /Sort
      StoreSort.js
    Sidebar.js
    StoreCard.js
  /Pages
    StoresPage.js
  App.js
  index.js
```

- **`/Components`**: Contains reusable components for filtering, sorting, and displaying store cards.
- **`/Pages`**: Contains the main `StoresPage` component which handles the logic and rendering of the page.
- **`App.js`**: The main entry point of the React app.
- **`index.js`**: The file that renders the React app to the DOM.

---

## **Tech Stack**

- **React**: JavaScript library for building user interfaces.
- **React Router**: For routing and managing URL query parameters.
- **Tailwind CSS**: For styling the app with utility-first CSS classes.

---

## **Contributing**

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push your changes to your forked repository (`git push origin feature-branch`).
5. Create a pull request.
---

This **README** provides the necessary instructions to understand, set up, and contribute to the project. You can expand the documentation with more detailed information as needed, including details about testing or deployment processes.