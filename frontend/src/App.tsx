import styles from "./App.module.css";

// Components
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className={styles.main}>
      <Navbar />
      <h1>myScheduler</h1>
    </div>
  )
}

export default App
