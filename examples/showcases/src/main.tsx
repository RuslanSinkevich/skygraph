import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@skygraph/styles'
import '@skygraph-examples/shared-react/layout/styles.css'
import './app.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
