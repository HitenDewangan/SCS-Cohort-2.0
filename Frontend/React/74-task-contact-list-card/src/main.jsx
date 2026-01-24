import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContactManager from './ContactManager.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContactManager />
  </StrictMode>,
)
