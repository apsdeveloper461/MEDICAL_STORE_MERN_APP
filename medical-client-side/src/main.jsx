import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import route from './routes/route.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={route}>
    <App />
    </RouterProvider>
  </React.StrictMode>,
)
