
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/useAuth';
import { SupabaseAuthProvider, useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useAuth } from '@/hooks/useAuth';
import Index from '@/pages/Index';
import Admin from '@/pages/Admin';
import Welcome from '@/pages/Welcome';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/NotFound';

// Component to handle auth-based routing
const AppContent = () => {
  const { user, isLoading } = useSupabaseAuth();
  const { isAuthenticated } = useAuth();

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
        {/* Admin route - accessible if admin is authenticated */}
        <Route 
          path="/admin" 
          element={isAuthenticated ? <Admin /> : <Welcome />} 
        />
        
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
    <SupabaseAuthProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </SupabaseAuthProvider>
  );
}

export default App;
