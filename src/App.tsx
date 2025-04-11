
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/components/CartContext";

// Pages
import Home from "@/pages/Home";
import ProductDetail from "@/pages/ProductDetail";
import ProductListing from "@/pages/ProductListing";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import NotFound from "./pages/NotFound";
import Account from "@/pages/Account";
import AccountInfo from "@/pages/account/AccountInfo";
import AddressBook from "@/pages/account/AddressBook";
import AddressForm from "@/pages/account/AddressForm";
import OrderHistory from "@/pages/account/OrderHistory";
import OrderDetail from "@/pages/account/OrderDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <BrowserRouter>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/products" element={<ProductListing />} />
                  <Route path="/category/:category" element={<ProductListing />} />
                  <Route path="/search" element={<ProductListing />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  
                  {/* Account Routes */}
                  <Route path="/account" element={<Account />}>
                    <Route index element={<AccountInfo />} />
                    <Route path="orders" element={<OrderHistory />} />
                    <Route path="orders/:id" element={<OrderDetail />} />
                    <Route path="addresses" element={<AddressBook />} />
                    <Route path="addresses/new" element={<AddressForm />} />
                    <Route path="addresses/edit/:id" element={<AddressForm />} />
                  </Route>
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </TooltipProvider>
        </CartProvider>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
