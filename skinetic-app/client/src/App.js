import React, { useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import FloatingEffects from "./components/FloatingEffects"; // make sure the file name matches exactly
import SplashScreen from "./components/SplashScreen";
import "./App.css";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showSplash, setShowSplash] = useState(true);

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <div className="App" style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
          <FloatingEffects /> {/* Only one correct import/use */}
          <h1>Skinetic</h1>
          <ProductForm onCreated={triggerRefresh} />
          <ProductList refreshTrigger={refreshKey} />
        </div>
      )}
    </>
  );
}

export default App;
