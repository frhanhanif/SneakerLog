import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import NotFound from "./pages/NotFound/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import SneakerList from "./pages/SneakerList/SneakerList";
import SneakerDetails from "./pages/SneakerList/SneakerDetails";

/*
Router: Enables routing in the app (wrap everything)
Routes:	A container for multiple Routes (handles navigation logic)
Route:	URL path
element: The component that should be rendered when visiting a route
*/
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
