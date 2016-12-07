import React from 'react';
import Banner from 'components/home/Banner';
import Intro from 'components/home/Intro';

function HomePage() {
  return (
    <div className="l-page">
      <Banner />
      <div className="l-content -home -short">
        <Intro />
      </div>
    </div>
  );
}

export default HomePage;
