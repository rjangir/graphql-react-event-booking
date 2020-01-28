import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={null}>
        <Route path="/auth" component={null}>
          <Route path="/events" component={null}>
            <Route path="/bookings" component={null}>
            </Route>
            <h1>it works!</h1>
    </BrowserRouter>
          );
          }
        
        export default App;
