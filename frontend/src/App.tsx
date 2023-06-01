import styles from "./App.module.css";

// Pages
import Calendar from "./pages/Calendar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Components
import Root from "./components/layout/Root";

import { 
  createBrowserRouter, 
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate
} from "react-router-dom";

import { useAuth } from "./hooks/useAuth";

function App() {
  const { authUser } = useAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index path="/" element={authUser ? <Calendar /> : <Navigate to="/login" />} />
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
