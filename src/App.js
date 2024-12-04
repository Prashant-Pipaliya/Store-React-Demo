import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoresPage from "./pages/StoresPage";
import Navbar from "./Components/Navbar/Navbar";
import StoreDetailPage from "./pages/StoreDetailPage";

const queryClient = new QueryClient();

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const onSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen bg-white">
          <Navbar onSearch={onSearch} />

          <div className="container m-auto bg-white">
            <Routes>
              <Route
                path="/"
                element={<StoresPage searchTerm={searchTerm} />}
              />
              <Route path="/store/:id" element={<StoreDetailPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;




