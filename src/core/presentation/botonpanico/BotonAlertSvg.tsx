import * as React from 'react';
import Svg, {
    Defs,
    LinearGradient,
    Stop,
    Path,
    Circle,
    Text,
  } from "react-native-svg";

function BotonAlertSvg(props:any) : JSX.Element  {
    return (
        <Svg  width={200}  height={200} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" {...props}>
        <Defs>
          <LinearGradient id="a" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop
              offset="0%"
              stopColor="#ff3c4a"
              stopOpacity={1}
            />
            <Stop
              offset="100%"
              stopColor="red"
              stopOpacity={1}
            />
          </LinearGradient>
        </Defs>
        <Path fill="none" d="M0 0h200v200H0z" />
        <Circle cx={'50%'} cy={'50%'} r={50} fill="url(#a)" />
        <Text
          x="50%"
          y="52%"
          textAnchor="middle"
          fill="#FFF"
          fontSize={20}
          fontWeight="bold"
        >
          {"ALERTA"}
        </Text>
      </Svg>
    );
  }

  export default BotonAlertSvg