
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "./hooks/use-theme";
import { LanguageProvider } from "./hooks/use-language";
import { UnitsProvider } from "./hooks/use-units";
import { SettingsProvider } from "./hooks/use-settings";
import { useEffect } from "react";
import Index from "./pages/Index";
import Welcome from "./pages/Welcome";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// Initialize mock user data for demo purposes
const initializeUserData = () => {
  if (!localStorage.getItem('userName')) {
    localStorage.setItem('userName', 'Emma Thompson');
    localStorage.setItem('userEmail', 'emma.thompson@medresponse.org');
    localStorage.setItem('userRole', 'First Responder');
    localStorage.setItem('userLocation', 'Central EMS');
  }
};

// Route guard component
const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // For demo purposes, we're checking if the user is on a protected route
    // In a real app, you would check if the user is authenticated
    const protectedRoutes = ['/home', '/search', '/profile', '/settings'];
    const isProtectedRoute = protectedRoutes.includes(location.pathname);
    
    if (isProtectedRoute && !localStorage.getItem('userName')) {
      // Redirect to auth page if not logged in
      navigate('/auth');
    }
  }, [navigate, location]);
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => {
  // Initialize mock user data for demo
  useEffect(() => {
    initializeUserData();
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <LanguageProvider defaultLanguage="english">
          <UnitsProvider defaultUnitSystem="metric">
            <SettingsProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <RouteGuard>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/welcome" element={<Welcome />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/search" element={<Home />} /> {/* Placeholder */}
                      <Route path="/profile" element={<Home />} /> {/* Placeholder */}
                      <Route path="/settings" element={<Home />} /> {/* Placeholder */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </RouteGuard>
                </BrowserRouter>
              </TooltipProvider>
            </SettingsProvider>
          </UnitsProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
