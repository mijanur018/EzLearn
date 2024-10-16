import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserContextProvider } from './Context/UserContext.jsx'
import { CourseContextProvider } from './Context/CourseContext.jsx'

export const server = `https://ezlearn-backend.onrender.com`
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <CourseContextProvider>
        <App />
      </CourseContextProvider>

    </UserContextProvider>

  </StrictMode>,
)
