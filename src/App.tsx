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

  return (
    <div className="font-josefin">
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
          <Route path="/store/:id" element={<Pages.ProductPage />} />
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
            path="/profile"
            element={
              <ProtectedRoute isUserLoggedIn={!!user} redirectTo="/signin">
                <Pages.ProfilePage />
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
