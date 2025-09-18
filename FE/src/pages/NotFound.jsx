import { Flex, Text } from "@chakra-ui/react";
import NotFoundImg from '@/assets/john-travolta-404.gif';

const NotFound = () => {
  return (
    <>
     <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      textAlign="center"
      padding="20px"
    >
      <img src={NotFoundImg} alt="404 Not Found"/>
      <Text textStyle={"lg"}>404 - Page Not Found</Text>
      <p>The page you are looking for does not exist.</p>
      <a href="/">Go back to Home</a>
    </Flex>
    </>
  );
}

export default NotFound;