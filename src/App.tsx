
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Editor from "./pages/Editor";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookieConsent from "./components/CookieConsent";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

const App = () => {
  // Get the initial theme before rendering to avoid flash
  const initialTheme = localStorage.getItem("theme") || 
    (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  
  // Apply theme class to html element immediately
  if (initialTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/o-mnie" element={<About />} />
                <Route path="/kontakt" element={<Contact />} />
                <Route path="/polityka-prywatnosci" element={<PrivacyPolicy />} />
                <Route path="/inny-dokument" element={<Navigate to="/kontakt" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <CookieConsent />
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
