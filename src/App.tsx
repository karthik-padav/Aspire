import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cards from "./components/pages/Cards";
import Layout from "./components/pages/Layout";
import { Helmet } from "react-helmet";

const gaId = import.meta.env.VITE_GA_ID;
function App() {
  return (
    <div className="text-black font-open xl:container xl:mx-auto xl:my-0">
      {gaId && (
        <Helmet>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          ></script>
          <script>
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
          </script>
        </Helmet>
      )}
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
