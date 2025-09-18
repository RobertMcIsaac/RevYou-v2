import { Box } from "@chakra-ui/react";
import TopBar from "../components/topbar/TopBar";

const TopBarLayout = ({ children }) => {
  return (
    <Box>
      <TopBar />
      <Box as="main" p={4}>
        {children}
      </Box>
    </Box>
  );
}

export default TopBarLayout;