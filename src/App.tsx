import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // Убедитесь, что файл i18n создан
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import HogwartsChart from "./components/HogwartsChart/HogwartsChart";
import PrivateRoute from "./routes/PrivateRoute";
import NotFoundPage from "./pages/NotFoundPage";

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Routes>
          {/* Публичные маршруты */}
          <Route path="/login" element={<LoginPage />} />

          {/* Защищенные маршруты */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/chart" element={<HogwartsChart />} />
          </Route>

          {/* Редирект и 404 */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </I18nextProvider>
  );
};

export default App;
