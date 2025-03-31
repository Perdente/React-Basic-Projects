import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/route/ProtectedRoute";

import CityList from "./components/modules/city-list/CityList";
import CountryList from "./components/modules/country-list/CountryList";
import City from "./components/modules/city/City";
import Form from "./components/ui/form/Form";
import SpinnerFullPage from "./components/ui/spinnerfullpage/SpinnerFullPage";

// import Homepage from "./pages/homepage/Homepage";
// import Product from "./pages/product/Product";
// import Login from "./pages/login/Login";
// import Pricing from "./pages/pricing/Pricing";
// import PageNotFound from "./pages/pagenotfound/PageNotFound";
// import AppLayout from "./pages/applayout/AppLayout";

// spliting codes to reduce bundle-size using lazy loading...
const Homepage = lazy(() => import("./pages/homepage/Homepage"));
const Product = lazy(() => import("./pages/product/Product"));
const Login = lazy(() => import("./pages/login/Login"));
const Pricing = lazy(() => import("./pages/pricing/Pricing"));
const PageNotFound = lazy(() => import("./pages/pagenotfound/PageNotFound"));
const AppLayout = lazy(() => import("./pages/applayout/AppLayout"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
