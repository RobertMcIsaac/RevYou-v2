import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getCampaignByLink,
  saveCampaignFeedback,
} from "../../services/CampaignService";
import { Box, Text, Button, Textarea, Flex } from "@chakra-ui/react";
import { formatDateRange } from "../../utils/dateUtils";
import { toaster } from "@/components/ui/toaster";

const FeedbackFormPage = () => {
  const { linkUuid } = useParams();
  const [campaignData, setCampaignData] = useState(null);
  const [feedback, setFeedback] = useState("");

  const fetchCampaign = async () => {
    try {
      const response = await getCampaignByLink(linkUuid);
      if (response.status === 200) {
        setCampaignData(response.data);
      }
    } catch (error) {
      console.error("Error fetching campaign:", error);
    }
  };

  const handleFeedbackSubmit = async (responseContents) => {
    if (!responseContents) {
      toaster.create({
        title: "Error",
        description: "Feedback cannot be empty.",
        type: "error",
      });
      return;
    }

    try {
      const response = await saveCampaignFeedback(
        campaignData.campaignId,
        linkUuid,
        responseContents
      );
      if (response.status === 200) {
        toaster.create({
          title: "Success",
          description: "Feedback submitted successfully.",
          type: "success",
        });
        setFeedback("");
      } else {
        toaster.create({
          title: "Error",
          description: response.message || "Failed to submit feedback.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toaster.create({
        title: "Error",
        description: "An error occurred while submitting feedback.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (linkUuid) {
      fetchCampaign();
    }
  }, []);

  return (
    <>
      <Box bg="white" p={4} borderRadius="md" boxShadow="md" _dark={{ bg:"blackAlpha.100"}}>
        <Flex direction="column" align="center" p={6}>
          {campaignData ? (
            <>
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Hi {campaignData.teamMember.fullName}!{" "}
                {campaignData.requestor.fullName} is requesting your feedback on
                your mutual project.
              </Text>
              <Box
                mb={4}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                bg="green.100"
                _dark={{ bg:"#303934"}}
              >
                <Flex direction="column" mb={2} align={"flex-start"}>
                  <Text fontSize={"md"} fontFamily={"body"} fontWeight={"bold"}>
                    {campaignData.title}
                  </Text>
                  <Text
                    fontSize={"md"}
                    fontFamily={"body"}
                    fontWeight={"light"}
                  >
                    {" "}
                    - Project: {campaignData.project.title}
                  </Text>
                  <Text
                    fontSize={"md"}
                    fontFamily={"body"}
                    fontWeight={"light"}
                  >
                    {" "}
                    - Dates:{" "}
                    {formatDateRange(
                      campaignData.project.projectStartDate,
                      campaignData.project.projectEndDate
                    )}
                  </Text>
                </Flex>
              </Box>
              {!campaignData.teamMember.isResponded ? (
                <>
                  <Text>Please write your thoughts bellow:</Text>
                  <Textarea
                    variant="outline"
                    placeholder="Put your feedback here..."
                    size={"md"}
                    name="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                  <Button
                    mt={4}
                    colorPalette="blue"
                    type="submit"
                    onClick={() => handleFeedbackSubmit(feedback)}
                    _dark={{ bg:"#528162ff"}}
                  >
                    Submit Feedback
                  </Button>
                  </>
                  ) : (
                  <Text fontSize="md" color="gray.500" mt={4}>
                    It looks like you have already provided feedback for this campaign. Thank you!
                  </Text>
              )}
            </>
          ) : (
            <Text>Loading campaign...</Text>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default FeedbackFormPage;
