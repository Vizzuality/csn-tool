import React from 'react';
import Banner from 'components/home/Banner';

function HomePage() {
  return (
    <div>
      <Banner />
      <div className="row">
        <div className="column">
          <p>Hi !</p>
          <p>I am the home page</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
