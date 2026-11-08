import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Providers } from './Providers';
import { NoticeProvider } from './Notice';
import './styles.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><Providers><NoticeProvider><App/></NoticeProvider></Providers></React.StrictMode>);
