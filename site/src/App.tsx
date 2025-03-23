import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

// i18n
import './i18n';

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import ProductDetails from "./pages/ProductDetails";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminCustomers from "./pages/admin/Customers";
import AdminCategories from "./pages/admin/Categories";

// Components
import NavbarTranslated from "./components/NavbarTranslated";
import Footer from "./components/Footer";
import { Head } from "react-day-picker";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ 
  element, 
  requireAdmin = false 
}: { 
  element: JSX.Element, 
  requireAdmin?: boolean 
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
    const savedLanguage = localStorage.getItem('preferredLanguage');
    const browserLanguage = navigator.language.split('-')[0];
    const supportedLanguages = ['fr', 'en', 'ar'];
    
    let detectedLanguage = 'fr';
    
    if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
      detectedLanguage = savedLanguage;
    } else if (supportedLanguages.includes(browserLanguage)) {
      detectedLanguage = browserLanguage;
    }
    
    i18n.changeLanguage(detectedLanguage);
    
    if (detectedLanguage === 'ar') {
      document.getElementById('navbar-container')?.setAttribute('dir', 'rtl');
      document.getElementById('navbar-container')?.classList.add('rtl');
    } else {
      document.getElementById('navbar-container')?.setAttribute('dir', 'ltr');
      document.getElementById('navbar-container')?.classList.remove('rtl');
    }
  }, [i18n]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <LanguageHandler />
            <meta
              name="google-site-verification"
              content="cCV_UCZDUYDHybn45Ucq3IbWbIRLvXTG00WQIs-AUMY"
            />
            <NavbarTranslated />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/cart" element={<Cart />} />
              
              {/* Protected routes */}
              <Route path="/account/*" element={<ProtectedRoute element={<Account />} />} />
              <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
              <Route path="/order-success" element={<ProtectedRoute element={<OrderSuccess />} />} />
              
              {/* Admin routes */}
              <Route path="/admin" element={<ProtectedRoute element={<Dashboard />} requireAdmin={true} />} />
              <Route path="/admin/products/*" element={<ProtectedRoute element={<AdminProducts />} requireAdmin={true} />} />
              <Route path="/admin/orders" element={<ProtectedRoute element={<AdminOrders />} requireAdmin={true} />} />
              <Route path="/admin/customers" element={<ProtectedRoute element={<AdminCustomers />} requireAdmin={true} />} />
              <Route path="/admin/categories" element={<ProtectedRoute element={<AdminCategories />} requireAdmin={true} />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
