import styles from "./App.module.css";

// Pages
import Schedule from "./pages/Schedule/Schedule";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import EditProfile from "./pages/EditProfile/EditProfile";

// Components
import Root from "./components/layout/Root";
import Loading from "./components/Loading";

import { 
  createBrowserRouter, 
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate
} from "react-router-dom";

import { useAuth } from "./hooks/useAuth";

function App() {
  const { authUser, loading } = useAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={loading ? <Loading type="full" /> : <Root />}>
        <Route index path="/" element={authUser ? <Schedule /> : <Navigate to="/login" />} />
        <Route path="/user" element={authUser ? <EditProfile /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!authUser ? <Register /> : <Navigate to="/" />} />
      </Route>
    )
  );

  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
