import { useState, useEffect } from "react";
import { getCampaignById } from "../../services/CampaignService";
import { Text, Card, List, Box, Badge, Button } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { BiCopy } from "react-icons/bi";
import { useAuth0 } from "@auth0/auth0-react";
import { formatDate } from "../../utils/dateUtils";

const CardDetails = (campaignId) => {
  const [campaign, setCampaign] = useState(null);
    const { getAccessTokenSilently } = useAuth0();

  const fetchCampaignDetails = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await getCampaignById(token, campaignId.campaignId);
      if (response.status === 200) {
        setCampaign(response.data);
      } else {
        console.error("Failed to fetch campaign details:", response.message);
        toaster.create({
          title: "Error",
          description: response.message || "Failed to fetch campaign details",
          type: "error",
        });
      }
    } catch (error) {
      console.log("Token error:", error);
      toaster.create({
        title: "Error",
        description: "Token missing or expired. Please log in again.",
        type: "error",
      });
    }
  };

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    toaster.create({
      title: "Email copied",
      description: "The respondent's email has been copied to your clipboard.",
      type: "success",
    });
  };

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    toaster.create({
      title: "Link copied",
      description:
        "The feedback request link has been copied to your clipboard.",
      type: "success",
    });
  };

  useEffect(() => {
    if (campaignId) {
      fetchCampaignDetails();
    }
  }, [campaignId.campaignId]);

  console.log("Campaign Details:", campaign);

  return (
    <>
      {campaign ? (
        <Card.Root _dark={{ bg: "#282828" }}>
          <Card.Header>
            <Text fontSize="2xl" fontWeight="bold">
              {campaign.title}
            </Text>
            {/* <Badge colorPalette={"green"} size={"md"}>
              Created By: {campaign.createdBy.email}
            </Badge> */}
          </Card.Header>
          <Card.Body>
            <List.Root>
              {campaign.projects.map((p) => (
                <>
                  <List.Item key={p._id}>
                    <Text fontSize={"lg"} fontWeight={"bold"}>
                      {p.project.title}
                    </Text>
                  </List.Item>
                  <List.Root ps={4} listStyleType={"none"}>
                    {p.team.map((member, index) => (
                      <List.Item key={index}>
                        <List.Root ps={5}>
                          <List.Item>Name: {member.fullName}</List.Item>
                          {/* <List.Item>Role: {member.role}</List.Item> */}
                          <List.Item>
                            Email: {" "}
                            <Text color={"blue"} as="span" fontFamily={'mono'} _dark={{ color:"gray.300"}}>
                                {member.email}
                            </Text>
                            <Button
                              size="xs"
                              onClick={() => handleCopyEmail(member.email)}
                              variant="plain"
                            >
                              <BiCopy />
                            </Button>
                          </List.Item>
                          <List.Item>
                            Personal link: {" "}
                            <Text color={"blue"} as="span" fontFamily={'mono'} _dark={{ color:"gray.300"}}>{member.link}</Text>
                            <Button
                              size="xs"
                              onClick={() => handleCopyLink(member.link)}
                              variant="plain"
                            >
                              <BiCopy />
                            </Button>
                          </List.Item>
                          <List.Item>
                            Responded: {member.responded ? "Yes" : "No"}
                          </List.Item>
                          {member.responded && (
                            <List.Item>
                              Response: 
                                {member.responses.map((response) => ( 
                                  <Box bg="yellow.100" p={2} mt={1} borderRadius="md" border={"1px solid #ccc"} _dark={{ bg:"#303934"}}>
                                  {response.content}
                                  <br/>
                                  {" "}
                                  <Text fontFamily={"mono"} fontSize="sm" color="gray.500" _dark={{ color:"gray.300"}}>
                                  Responded at:
                                  {formatDate(response.createdAt)}
                                  </Text>
                                  </Box>
                                ))}
                            </List.Item>
                          )}
                        </List.Root>
                      </List.Item>
                    ))}
                  </List.Root>
                </>
              ))}
            </List.Root>
          </Card.Body>
        </Card.Root>
      ) : (
        <p>Loading campaign details...</p>
      )}
    </>
  );
};

export default CardDetails;
