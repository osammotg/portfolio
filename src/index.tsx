import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import posthog from 'posthog-js';

posthog.init('phc_ziKXQLQQcbeMx5XtmjGQCkcYEDx5fgoXwggwFFod9Mhn', {
  api_host: 'https://eu.i.posthog.com',
  session_recording: { maskAllInputs: false },
  autocapture: true,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
    <App />
    <SpeedInsights />
    <Analytics />
  </Router>
);

reportWebVitals();
