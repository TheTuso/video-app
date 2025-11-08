import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgHomeIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M16.819 1.614a1.33 1.33 0 0 0-1.637 0l-12 9.334A1.33 1.33 0 0 0 2.666 12v14.667a2.667 2.667 0 0 0 2.666 2.666h21.334a2.667 2.667 0 0 0 2.666-2.666V12c0-.411-.19-.8-.514-1.052zm4.514 25.053h5.334V12.652L16 4.356 5.333 12.652v14.015h5.334V16c0-.736.597-1.333 1.333-1.333h8c.736 0 1.333.597 1.333 1.333zm-8 0v-9.334h5.334v9.334z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgHomeIcon;
