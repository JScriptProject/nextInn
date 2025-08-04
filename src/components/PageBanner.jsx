import React from "react";

function PageBanner({ img, heading }) {
  return (
    <div className="page-banner" style={{ backgroundImage: `url(${img})` }}>
      <h2>{heading}</h2>
    </div>
  );
}

export default PageBanner;
