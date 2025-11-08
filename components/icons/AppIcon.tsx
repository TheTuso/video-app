import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgAppIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={128}
    height={128}
    fill="none"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeWidth={8}
      d="M10.667 64c0-25.142 0-37.712 7.81-45.523 7.81-7.81 20.381-7.81 45.523-7.81 25.141 0 37.713 0 45.523 7.81s7.81 20.381 7.81 45.523c0 25.141 0 37.713-7.81 45.523s-20.382 7.81-45.523 7.81-37.712 0-45.523-7.81c-7.81-7.81-7.81-20.382-7.81-45.523Z"
    />
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={8}
      d="M114.667 42.667H13.333M56 13.333 37.333 42.667M90.667 13.333 72 42.667M80 77.333c0-3.378-3.53-5.656-10.592-10.212-7.158-4.618-10.737-6.927-13.406-5.232-2.669 1.696-2.669 6.279-2.669 15.444s0 13.75 2.67 15.445c2.668 1.695 6.247-.614 13.405-5.232C76.469 82.989 80 80.71 80 77.333Z"
    />
  </Svg>
);
export default SvgAppIcon;
