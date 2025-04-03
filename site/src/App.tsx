import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import NavbarTranslated from "./components/NavbarTranslated";
import Footer from "./components/Footer";
import './i18n';
// Lazy-loaded pages
import React, { lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/Index"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Account = lazy(() => import("./pages/Account"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminProducts = lazy(() => import("./pages/admin/Products"));
const AdminOrders = lazy(() => import("./pages/admin/Orders"));
const AdminCustomers = lazy(() => import("./pages/admin/Customers"));
const AdminCategories = lazy(() => import("./pages/admin/Categories"));
const MaterialDetails = lazy(() => import("./pages/MaterialDetails"));

const queryClient = new QueryClient();

const ProtectedRoute = ({
  element,
  requireAdmin = false,
}: {
  element: JSX.Element;
  requireAdmin?: boolean;
}) => {
  const { user, isLoading, isAdmin } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" />;
  }

  return element;
};

const LanguageHandler = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    const browserLanguage = navigator.language.split("-")[0];
    const supportedLanguages = ["fr", "en", "ar"];

    const detectedLanguage =
      savedLanguage && supportedLanguages.includes(savedLanguage)
        ? savedLanguage
        : supportedLanguages.includes(browserLanguage)
        ? browserLanguage
        : "fr";

    i18n.changeLanguage(detectedLanguage);

    const navbar = document.getElementById("navbar-container");
    if (detectedLanguage === "ar") {
      navbar?.setAttribute("dir", "rtl");
      navbar?.classList.add("rtl");
    } else {
      navbar?.setAttribute("dir", "ltr");
      navbar?.classList.remove("rtl");
    }
  }, [i18n]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <HelmetProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <LanguageHandler />
              <NavbarTranslated />
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQPage />} /> {/* Added FAQPage route */}

                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/materials/:material" element={<MaterialDetails />} />
                  {/* Protected routes */}
                  <Route
                    path="/account/*"
                    element={<ProtectedRoute element={<Account />} />}
                  />
                  <Route
                    path="/checkout"
                    element={<ProtectedRoute element={<Checkout />} />}
                  />
                  <Route
                    path="/order-success"
                    element={<ProtectedRoute element={<OrderSuccess />} />}
                  />
                  {/* Admin routes */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute element={<Dashboard />} requireAdmin={true} />
                    }
                  />
                  <Route
                    path="/admin/products/*"
                    element={
                      <ProtectedRoute element={<AdminProducts />} requireAdmin={true} />
                    }
                  />
                  <Route
                    path="/admin/orders"
                    element={
                      <ProtectedRoute element={<AdminOrders />} requireAdmin={true} />
                    }
                  />
                  <Route
                    path="/admin/customers"
                    element={
                      <ProtectedRoute element={<AdminCustomers />} requireAdmin={true} />
                    }
                  />
                  <Route
                    path="/admin/categories"
                    element={
                      <ProtectedRoute element={<AdminCategories />} requireAdmin={true} />
                    }
                  />
                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <Footer />
            </BrowserRouter>
          </HelmetProvider>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
