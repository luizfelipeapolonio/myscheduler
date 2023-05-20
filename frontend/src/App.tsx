import styles from "./App.module.css";

// Pages
import Calendar from "./pages/Calendar";
import Login from "./pages/Auth/Login";

// Components
import Root from "./components/layout/Root";

import { 
  createBrowserRouter, 
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index path="/" element={<Calendar />} />
        <Route path="/login" element={<Login />} />
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
