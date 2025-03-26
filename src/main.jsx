import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Use Singleton Pattern for createRoot
if (!window.__root) {
  window.__root = ReactDOM.createRoot(document.getElementById('root'));
}

window.__root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)