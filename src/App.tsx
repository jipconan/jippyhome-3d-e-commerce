import React, { useEffect } from "react";
import { ChakraProvider, Flex, Box } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import * as Pages from "./Pages";
import * as Comps from "./components";
import { theme } from "./utils/themeOverride/theme";
import ProtectedRoute from "./utils/ProtectedRoute";
import { getUser } from "./service/users";
import { User } from "./types/propsTypes";
import { initializeSnipcartEventHandlers } from "./utils/SnipcartHandler";
import "./App.css";

const App: React.FC = () => {
  const user: User | null = getUser();

  return (
    <ChakraProvider theme={theme}>
      <Box maxW="100vw" w="100vw">
        <Router>
          <AppContent user={user} />
        </Router>
      </Box>
    </ChakraProvider>
  );
};

const AppContent: React.FC<{ user: User | null }> = ({ user }) => {
  const location = useLocation();
  const isSignUpPage = location.pathname === "/signup";
  const isSignInPage = location.pathname === "/signin";

  // Initialize Snipcart event handlers when the component mounts
  useEffect(() => {
    if (user) {
      initializeSnipcartEventHandlers(user); // Pass user ID to the handler
    } else {
      console.warn("User is not logged in.");
    }
  }, [user]);

  return (
    <div>
      {!(isSignInPage || isSignUpPage) && (
        <>
          <header className="header">
            <Flex direction="column">
              <Comps.AnnouncementHeader />
              <Comps.Header user={user} />
              <Comps.CategoryBar />
            </Flex>
          </header>
        </>
      )}
      <main>
        <Routes>
          <Route path="/" element={<Pages.HomePage />} />
          <Route path="/contact" element={<Pages.ContactPage />} />
          <Route path="/faq" element={<Pages.FaqPage />} />
          <Route path="/store" element={<Pages.StorePage />} />
          <Route path="/store/:category" element={<Pages.StorePage />} />
          <Route path="/store/product/:id" element={<Pages.ProductPage />} />
          <Route path="/store/merchant" element={<Pages.MerchantPage />} />
          <Route path="*" element={<Navigate to="/" />} />

          {/* Public Routes */}
          <Route
            path="/signup"
            element={
              <ProtectedRoute isUserLoggedIn={!user} redirectTo="/">
                <Pages.SignUpPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <ProtectedRoute isUserLoggedIn={!user} redirectTo="/">
                <Pages.SignInPage />
              </ProtectedRoute>
            }
          />

          {/* Private Route */}
          <Route
            path="/account"
            element={
              <ProtectedRoute isUserLoggedIn={!!user} redirectTo="/">
                <Pages.AccountPage user={user} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!(isSignInPage || isSignUpPage) && (
        <footer className="footer">
          <Comps.Footer />
        </footer>
      )}
    </div>
  );
};

export default App;
