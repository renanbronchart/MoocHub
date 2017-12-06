import React from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => (
  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/courses">Courses</Link></li>
  </ul>
)
