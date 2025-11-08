import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgLikesIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.483 24.858v-7.079M2.921 16.218a4.274 4.274 0 1 1 8.538 0v7.206a4.276 4.276 0 1 1-8.538 0z"
    />
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.483 23.424a4.29 4.29 0 0 0 4.262 4.314h5.274a5.68 5.68 0 0 0 5.452-4.096l1.92-6.503a2.882 2.882 0 0 0-2.688-3.84h-7.065V6.541a1.87 1.87 0 0 0-1.856-1.882 1.856 1.856 0 0 0-1.78 1.357l-3.52 11.725"
    />
  </Svg>
);
export default SvgLikesIcon;
