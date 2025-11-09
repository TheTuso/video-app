import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgClockIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <Path
      fill="currentColor"
      d="M30.667 16c0 8.1-6.567 14.667-14.667 14.667S1.333 24.1 1.333 16 7.9 1.333 16 1.333 30.667 7.9 30.667 16M4.009 16c0 6.622 5.369 11.991 11.991 11.991S27.99 22.622 27.99 16 22.623 4.01 16 4.01 4.01 9.377 4.01 16"
    />
    <Path
      fill="currentColor"
      d="M16 6.667c-.736 0-1.333.597-1.333 1.333v8.622s0 .348.169.61c.113.221.289.414.52.547l6.16 3.557a1.333 1.333 0 0 0 1.334-2.31l-5.517-3.184V8c0-.736-.597-1.333-1.333-1.333"
    />
  </Svg>
);
export default SvgClockIcon;
