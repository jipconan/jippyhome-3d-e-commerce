import React from "react";
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
import { ProtectedRoute, AdminRoute } from "./utils/RouteChecker";
import { getUser, getAdmin } from "./service/users";
import { User, Admin } from "./types/propsTypes";
import "./App.css";

const App: React.FC = () => {
  const user: User | null = getUser();
  const admin: Admin = getAdmin();

  return (
    <ChakraProvider theme={theme}>
      <Box maxW="100vw" w="100vw">
        <Router>
          <AppContent user={user} admin={admin} />
        </Router>
      </Box>
    </ChakraProvider>
  );
};

const AppContent: React.FC<{ user: User | null; admin: Admin }> = ({
  user,
  admin,
}) => {
  const location = useLocation();
  const isSignUpPage = location.pathname === "/signup";
  const isSignInPage = location.pathname === "/signin";

  return (
    <div>
      {!(isSignInPage || isSignUpPage) && (
        <>
          <header className="header">
            <Flex direction="column">
              <Comps.AnnouncementHeader />
              <Comps.Header user={user} admin={admin} />
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
          <Route
            path="/store/product/:id"
            element={<Pages.ProductPage user={user} />}
          />
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
          <Route
            path="/merchant"
            element={
              <AdminRoute isUserAdmin={!!admin} redirectTo="/">
                <Pages.MerchantPage />
              </AdminRoute>
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
