
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/useAuth';
import { SupabaseAuthProvider, useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { LanguageProvider } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import Index from '@/pages/Index';
import Admin from '@/pages/Admin';
import Welcome from '@/pages/Welcome';
import Auth from '@/pages/Auth';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/NotFound';

// Component to handle auth-based routing
const AppContent = () => {
  const { user, isLoading } = useSupabaseAuth();
  const { isAuthenticated, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vilo-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Routes>
        {/* Admin route - accessible if admin is authenticated, redirects to home after logout */}
        <Route 
          path="/admin" 
          element={isAuthenticated ? <Admin /> : <Welcome />} 
        />
        {/* Auth route - accessible to everyone */}
        <Route path="/auth" element={<Auth />} />
        {/* User routes */}
        {user ? (
          <>
            <Route path="/" element={<Index />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="/" element={<Welcome />} />
        )}
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <SupabaseAuthProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AuthProvider>
      </SupabaseAuthProvider>
    </LanguageProvider>
  );
}

export default App;
