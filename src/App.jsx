import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Outlet, useNavigate } from "react-router-dom";
import NavbarComponent from "./components/Navbar";

function App() {
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate} className="dark h-full">
      <NavbarComponent />
      <main>
        <Outlet />
      </main>
    </NextUIProvider>
  );
}

export default App;
