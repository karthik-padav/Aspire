import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cards from "./components/pages/Cards";
import Layout from "./components/pages/Layout";

function App() {
  return (
    <div className="text-black font-open container mx-auto my-0">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <h1 className="text-2xl font-semibold">Home</h1>
              </Layout>
            }
          />
          <Route
            path="/cards"
            element={
              <Layout>
                <Cards />
              </Layout>
            }
          />
          <Route
            path="/payments"
            element={
              <Layout>
                <h1 className="text-2xl font-semibold">Payments</h1>
              </Layout>
            }
          />
          <Route
            path="/credit"
            element={
              <Layout>
                <h1 className="text-2xl font-semibold">Credit</h1>
              </Layout>
            }
          />
          <Route
            path="/account"
            element={
              <Layout>
                <h1 className="text-2xl font-semibold">Account</h1>
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <h1 className="text-2xl font-semibold">Page Not Found</h1>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
      <div id="portal-root" />
    </div>
  );
}

export default App;
