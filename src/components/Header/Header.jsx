import React from 'react';

const Header = ({ title }) => (
  <div className="instructions">
    <div>
      <img src="/images/GCTC_Logo.jpg" alt="Gilda's Club Twin Cities Logo" height="150"/>
      <h1 className="lead">{ title}</h1>
    </div>
  </div>
);

export default Header;
