import React from 'react';

const Header = ({ title }) => (
  <div className="instructions">
    <div>
      <img src="/images/GCTC_Logo.jpg" alt="Gilda's Club Twin Cities Logo" height="150"/>
      {/* <h1 className="lead">{ title}</h1> */}
      <p>Life is about not knowing, having to change, taking the moment and making the best of it, without knowing what's going to happen next.</p>
    </div>
  </div>
);

export default Header;
