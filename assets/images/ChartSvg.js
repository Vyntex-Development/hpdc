const ChartSvg = ({ active }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="598"
      height="598"
      viewBox="0 0 598 598"
      fill="none"
      style={{ overflow: "inherit" }}
    >
      <path
        d="M298.545 0.00244141C337.751 0.00243969 376.573 7.72454 412.794 22.7279C449.015 37.7312 481.926 59.7219 509.649 87.4444C537.371 115.167 559.362 148.078 574.365 184.299C589.369 220.521 597.091 259.342 597.091 298.548H298.545L298.545 0.00244141Z"
        fill="#4650F0"
        opacity={active === 1 ? "1" : "0.3"}
        style={{
          transition: "1s all",
          transform: `${
            active === 1 ? "translate(7.5%, -7.5%)" : "translate(0px, 0px)"
          }`,
        }}
      />
      <path
        d="M597.091 298.545C597.091 361.592 577.132 423.02 540.074 474.026C503.016 525.032 450.762 562.997 390.801 582.479L298.545 298.545H597.091Z"
        fill="#CF4FF7"
        opacity={active === 2 ? "1" : "0.3"}
        style={{
          transition: "1s all",
          transform: `${
            active === 2 ? "translate(10%, 7.5%)" : "translate(0px, 0px)"
          }`,
        }}
      />
      <path
        d="M390.801 582.481C342.975 598.021 292 601.228 242.604 591.805C193.208 582.382 146.992 560.635 108.245 528.581L298.545 298.548L390.801 582.481Z"
        fill="#8E30FF"
        opacity={active === 3 ? "1" : "0.3"}
        style={{
          transition: "1s all",
          transform: `${
            active === 3 ? "translate(-2.5%, 12.5%)" : "translate(0px, 0px)"
          }`,
        }}
      />
      <path
        d="M108.245 528.581C74.3842 500.569 47.1249 465.426 28.4134 425.662C9.70202 385.898 -3.84191e-06 342.494 0 298.548L298.545 298.548L108.245 528.581Z"
        fill="#1F8CCC"
        opacity={active === 4 ? "1" : "0.3"}
        style={{
          transition: "1s all",
          transform: `${
            active === 4 ? "translate(-10%, 5%)" : "translate(0px, 0px)"
          }`,
        }}
      />
      <path
        d="M0 298.548C3.5655e-06 257.763 8.3565 217.411 24.554 179.981C40.7515 142.551 64.4464 108.837 94.177 80.9176L298.545 298.548L0 298.548Z"
        fill="#56E9C3"
        opacity={active === 5 ? "1" : "0.3"}
        style={{
          transition: "1s all",
          transform: `${
            active === 5 ? "translate(-11%, -5%)" : "translate(0px, 0px)"
          }`,
        }}
      />
      <path
        d="M94.177 80.9176C121.606 55.1596 153.658 34.8191 188.643 20.9674L298.545 298.548L94.177 80.9176Z"
        fill="#A89FDE"
        opacity={active === 6 ? "1" : "0.3"}
        style={{
          transition: "1s all",
          transform: `${
            active === 6 ? "translate(-6.5%, -10%)" : "translate(0px, 0px)"
          }`,
        }}
      />
      <path
        d="M188.643 20.9674C209.012 12.903 230.206 7.10498 251.843 3.67803L298.545 298.548L188.643 20.9674Z"
        fill="#9E1CCC"
        opacity={active === 7 ? "1" : "0.3"}
        style={{
          transition: "1s all",
          transform: `${
            active === 7 ? "translate(-2.5%, -10%)" : "translate(0px, 0px)"
          }`,
        }}
      />
      <path
        d="M251.843 3.67803C267.29 1.23142 282.906 0.00244122 298.545 0.00244141L298.545 298.548L251.843 3.67803Z"
        fill="#DF38EE"
        opacity={active === 8 ? "1" : "0.3"}
        style={{
          transition: "1s all",
          transform: `${
            active === 8 ? "translate(-0.75%, -10%)" : "translate(0px, 0px)"
          }`,
        }}
      />
    </svg>
  );
};

export default ChartSvg;
