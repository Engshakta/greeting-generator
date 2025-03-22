import { createRoot } from 'react-dom/client';
import './index.css'; // Must be here
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);