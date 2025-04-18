import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import NotFound from "./pages/NotFound/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import SneakerList from "./pages/SneakerList/SneakerList";
import SneakerDetails from "./pages/SneakerList/SneakerDetails";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Navigate to="/sneaker-list" />} />
            <Route path="/sneaker-list" element={<SneakerList />} />
            <Route path="/card-view/sneaker-details/:id" element={<SneakerDetails />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
