
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/components/CartContext";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialButtons from "@/components/SocialButtons";

// Pages
import Home from "@/pages/Home";
import ProductListing from "@/pages/ProductListing";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Account from "@/pages/Account";
import NotFound from "@/pages/NotFound";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";

// Account Pages
import AccountInfo from "@/pages/account/AccountInfo";
import AddressBook from "@/pages/account/AddressBook";
import OrderHistory from "@/pages/account/OrderHistory";
import OrderDetail from "@/pages/account/OrderDetail";
import AddressForm from "@/pages/account/AddressForm";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <CartProvider>
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductListing />} />
                  <Route path="/category/:slug" element={<ProductListing />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/search" element={<ProductListing />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  
                  {/* Blog Routes */}
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogDetail />} />
                  
                  {/* Account Routes */}
                  <Route path="/account" element={<Account />}>
                    <Route index element={<AccountInfo />} />
                    <Route path="addresses" element={<AddressBook />} />
                    <Route path="addresses/add" element={<AddressForm />} />
                    <Route path="addresses/edit/:id" element={<AddressForm />} />
                    <Route path="orders" element={<OrderHistory />} />
                    <Route path="orders/:id" element={<OrderDetail />} />
                  </Route>
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
            
            {/* Social floating buttons */}
            <SocialButtons />
            
            <Toaster />
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
