import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
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
import { ScrollToTop } from "./utils/PageUtils";
import "./App.css";

const App: React.FC = () => {
  const user: User | null = getUser();
  const admin: Admin = getAdmin();

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <AppContent user={user} admin={admin} />
      </Router>
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
            <Comps.FadingBox>
              <Comps.Header user={user} admin={admin} />
            </Comps.FadingBox>
          </header>
        </>
      )}

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Comps.FadingBox>
                <Pages.HomePage />
              </Comps.FadingBox>
            }
          />
          <Route
            path="/contact"
            element={
              <Comps.FadingBox>
                <Pages.ContactPage />
              </Comps.FadingBox>
            }
          />
          <Route
            path="/faq"
            element={
              <Comps.FadingBox>
                <Pages.FaqPage />
              </Comps.FadingBox>
            }
          />
          <Route
            path="/store"
            element={
              <Comps.FadingBox>
                <Pages.StorePage />
              </Comps.FadingBox>
            }
          />
          <Route
            path="/store/:category"
            element={
              <Comps.FadingBox>
                <Pages.StorePage />
              </Comps.FadingBox>
            }
          />
          <Route
            path="/store/product/:id"
            element={
              <Comps.FadingBox>
                <Pages.ProductPage user={user} />
              </Comps.FadingBox>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />

          {/* Public Routes */}
          <Route
            path="/signup"
            element={
              <ProtectedRoute isUserLoggedIn={!user} redirectTo="/">
                <Comps.FadingBox>
                  <Pages.SignUpPage />
                </Comps.FadingBox>
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <ProtectedRoute isUserLoggedIn={!user} redirectTo="/">
                <Comps.FadingBox>
                  <Pages.SignInPage />
                </Comps.FadingBox>
              </ProtectedRoute>
            }
          />

          {/* Private Route */}
          <Route
            path="/account"
            element={
              <ProtectedRoute isUserLoggedIn={!!user} redirectTo="/">
                <Comps.FadingBox>
                  <Pages.AccountPage user={user} />
                </Comps.FadingBox>
              </ProtectedRoute>
            }
          />
          <Route
            path="/merchant"
            element={
              <AdminRoute isUserAdmin={!!admin} redirectTo="/">
                <Comps.FadingBox>
                  <Pages.MerchantPage />
                </Comps.FadingBox>
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
