import { keyframes } from "@emotion/react";

export const shiningAnimation = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
  50% {
    transform:  scale(1.2);
    opacity: 1;
  }
  100% {
    transform:  scale(1);
    opacity: 1;
  }
`;
