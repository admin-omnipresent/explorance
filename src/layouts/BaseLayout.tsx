import { Box } from "@chakra-ui/react";
import React from "react";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return <Box>{children}</Box>;
};

export default BaseLayout;
