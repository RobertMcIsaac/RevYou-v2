import { Box } from "@chakra-ui/react";

export default function NoTopBarLayout({ children }) {
  return (
    <Box as="main" p={4}>
      {children}
    </Box>
  );
}
