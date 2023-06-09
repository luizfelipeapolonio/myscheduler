import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { AuthContextProvider } from "./context/Auth/AuthContextProvider.tsx";
import { DateToScheduleProvider } from "./context/Date/DateToScheduleProvider.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <DateToScheduleProvider>
        <App />
      </DateToScheduleProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
