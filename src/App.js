import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Filter from "./pages/Filter";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./pages/Login";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/filter" element={<Filter />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
