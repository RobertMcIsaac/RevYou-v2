import CardDetails from "../../components/details/CardDetails";
import { useParams, useNavigate } from "react-router-dom";
import { Text, Box, Button } from "@chakra-ui/react";

const DetailsPage = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  return (
    <>
    <Box padding="20px">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Campaign Details
      </Text>
      <CardDetails campaignId={campaignId} />
      <Button variant={"surface"} colorPalette={"gray"} mt={4} onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </Button>
    </Box>
    </>
  );
};

export default DetailsPage;
