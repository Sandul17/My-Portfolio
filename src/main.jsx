import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Experience } from './Experience';
import './styles.css';
import './effects.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><Experience><App/></Experience></React.StrictMode>);
