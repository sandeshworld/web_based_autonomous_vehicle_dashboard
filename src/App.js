import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import SteeringSpeedDashboard from './speedSteeringAngleDashboad';

function App() {
  return (
    <div className="App">
      <h1>LGSVL Autonomous Vehicle Simulation Vehicle Dashboard</h1>
      <SteeringSpeedDashboard/>
    </div>
  );
}

export default App;
