import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {FirebaseProvider} from './context/Firebasecontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </StrictMode>,
)
