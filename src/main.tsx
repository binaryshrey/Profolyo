import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';
import Toasts from './components/Toasts';

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <Toasts />
  </>,
);
