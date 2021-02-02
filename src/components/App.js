import React, { useState } from "react";
import AppRouter from "./Router";
import firebase from "../firebase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />;
      <footer>&copy;{new Date().getFullYear} JSwitter </footer>
    </>
  );
}

export default App;
