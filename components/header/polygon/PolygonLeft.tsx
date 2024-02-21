import React from "react";

const clipPathStyle = {
  clipPath: `polygon(
        74.1% 44.1%,
        100% 61.6%,
        97.5% 26.9%,
        85.5% 0.1%,
        80.7% 2%,
        72.5% 32.5%,
        60.2% 62.4%,
        52.4% 68.1%,
        47.5% 58.3%,
        45.2% 34.5%,
        27.5% 76.7%,
        0.1% 64.9%,
        17.9% 100%,
        27.6% 76.8%,
        76.1% 97.7%,
        74.1% 44.1%
    )`,
};

const PolygonLeft = () => (
  <div
    aria-hidden="true"
    className="absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl sm:-top-80"
  >
    <div
      className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#00eeff] to-[#002fff] opacity-70 sm:w-[72.1875rem]"
      style={clipPathStyle}
    ></div>
  </div>
);

export default React.memo(PolygonLeft);
