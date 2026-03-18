import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer  // ✅ once globally, affects whole app
        position="top-right"
        autoClose={3000}
        closeOnClick
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </Provider>
  </StrictMode>
)
