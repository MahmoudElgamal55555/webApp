import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './DashBoard/dashboard.css';

import App from './App';
// import router
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BootStrapLinkCss />
    <Router>
      <App />
    </Router>
    <BootStrapScript />
  </>
);

function BootStrapLinkCss() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossorigin="anonymous"
      />
    </>
  );
}

function BootStrapScript() {
  return (
    <>
      <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></script>

      <script
        src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
        crossorigin></script>

      <script
        src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
        crossorigin></script>
    </>
  );
}