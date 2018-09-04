import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/user">
            User Home
          </Link>
        </li>
        <li>
          <Link to="/register_view">
            Register View Page
          </Link>
        </li>
        <li>
          <Link to="/recovery">
           Password Recovery Page
          </Link>
        </li>
        <li>
          <Link to="/reset">
            Password Reset Page
          </Link>
        </li>
        <li>
          <Link to="/shifts">
            My Shifts Page
          </Link>
        </li>
        <li>
          <Link to="/upcoming_opportunities">
            Upcoming Opportunities Page
          </Link>
        </li>
        <li>
          <Link to="/manage_volunteers">
            Manage Volunteers Page
          </Link>
        </li>
        <li>
          <Link to="/volunteer">
            Single Volunteer Page
          </Link>
        </li>
        <li>
          <Link to="/manage_opportunities">
            Manage Opportunities Page
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
