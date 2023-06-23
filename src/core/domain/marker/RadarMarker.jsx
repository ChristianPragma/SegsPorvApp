import * as React from "react";
import Svg, { Defs, RadialGradient, Stop, Circle } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: animate */
const RadarMaker = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={200}
    height={200}
    viewBox="0 0 200 200"
  >
    <Defs>
      <RadialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <Stop
          offset="0%"
          style={{
            stopColor: "#FF0000",
            stopOpacity: 0.8,
          }}
        />
        <Stop
          offset="100%"
          style={{
            stopColor: "#FF0000",
            stopOpacity: 0,
          }}
        />
      </RadialGradient>
    </Defs>
    <Circle
      cx={100}
      cy={100}
      r={80}
      fill="none"
      stroke="#ff4040"
      strokeWidth={1}
    />
    <Circle
      cx={100}
      cy={100}
      r={60}
      fill="none"
      stroke="#ff4040"
      strokeWidth={1}
    />
    <Circle
      cx={100}
      cy={100}
      r={40}
      fill="none"
      stroke="#ff4040"
      strokeWidth={1}
    />
    <Circle
      cx={100}
      cy={100}
      r={20}
      fill="none"
      stroke="#ff4040"
      strokeWidth={1}
    />
    <Circle cx={100} cy={100} r={5} fill="url(#grad)"></Circle>
  </Svg>
);
export default RadarMaker;



// import React from 'react';
// import { Svg, Circle, RadialGradient, Stop } from 'react-native-svg';

// const Radar: React.FC = () => {
//   return (
//     <Svg >

//     </Svg>
//   );
// };

// export default Radar;

    //   <Defs>
    //     <RadialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
    //       <Stop offset="0%" stopColor="#FF0000" stopOpacity={0.8} />
    //       <Stop offset="100%" stopColor="#FF0000" stopOpacity={0} />
    //     </RadialGradient>
    //   </Defs>
    //   <Circle cx={100} cy={100} r={80} fill="none" stroke="#FF0000" strokeWidth={2} />
    //   <Circle cx={100} cy={100} r={60} fill="none" stroke="#FF0000" strokeWidth={2} />
    //   <Circle cx={100} cy={100} r={40} fill="none" stroke="#FF0000" strokeWidth={2} />
    //   <Circle cx={100} cy={100} r={20} fill="none" stroke="#FF0000" strokeWidth={2} />
    //   <Circle cx={100} cy={100} r={5}>
        // <Animate attributeName="r" dur="2s" repeatCount="indefinite" values="5; 50; 5" keyTimes="0; 0.5; 1" />
    //     <Stop offset="0%" stopColor="#FF0000" stopOpacity={0.8} />
    //     <Stop offset="100%" stopColor="#FF0000" stopOpacity={0} />
    //   </Circle>