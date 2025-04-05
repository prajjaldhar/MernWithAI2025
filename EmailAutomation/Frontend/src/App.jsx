import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import AdminPage from "./pages/AdminPage";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EmailAutomation from "./pages/EmailAutomation";
import LoginShimmer from "./components/LoginShimmer";
import NotFoundPage from "./pages/NotFound";

const AppWrapper = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [storedUser, setStoredUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const validPaths = ["/login", "/signup", "/admin", "/emailautomation"];
  const isWildcardRoute = useMemo(() => {
    return !validPaths.includes(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        try {
          const user = JSON.parse(localStorage.getItem("UserData"));
          setStoredUser(user);
        } catch (error) {
          console.error("Error parsing UserData from localStorage:", error);
          setStoredUser(null);
        } finally {
          setLoading(false);
        }
      },
      isWildcardRoute ? 0 : 4000
    ); // No shimmer on unknown route

    return () => clearTimeout(timeout);
  }, [isWildcardRoute]);

  if (loading && !isWildcardRoute) {
    return (
      <div className="p-8 min-h-screen bg-gray-900">
        <LoginShimmer />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {storedUser && (
        <>
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <div
            className={`flex flex-col transition-all duration-300 ease-in-out ${
              isSidebarOpen ? "ml-64" : "ml-20"
            }`}
          >
            <Header
              sidebarExtended={isSidebarOpen}
              setSidebarExtended={setIsSidebarOpen}
            />
          </div>
        </>
      )}

      <main className="flex-1 p-6 overflow-y-auto mt-16">
        <Routes>
          <Route
            path="/login"
            element={
              storedUser ? <Navigate to="/admin" replace /> : <LoginPage />
            }
          />
          <Route
            path="/admin"
            element={
              storedUser ? <AdminPage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/emailautomation"
            element={
              storedUser ? (
                <EmailAutomation />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};

// Wrap once in BrowserRouter
const App = () => (
  <BrowserRouter>
    <AppWrapper />
  </BrowserRouter>
);

export default App;
