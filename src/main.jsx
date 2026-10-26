import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Experience } from './Experience';
import { NoticeProvider } from './Notice';
import './styles.css';
import './effects.css';
import './application.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><Experience><NoticeProvider><App/></NoticeProvider></Experience></React.StrictMode>);
