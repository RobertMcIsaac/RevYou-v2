import {
  Box,
  Button,
  Card,
  HStack,
  Input,
  Span,
  Flex,
  Text,
  Badge,
  IconButton,
  VStack,
  Field,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FcCalendar, FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import { FaRegTrashAlt, FaEdit, FaSave } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { createCampaign } from "../../services/CampaignService";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../../contexts/UserContext";

const FEEDBACK_BASE_URL = import.meta.env.VITE_FEEDBACK_BASE_URL || "http://localhost:5173";
const generateMemberId = () => crypto.randomUUID(); // This makes member links unique

const MemberInput = ({ member, index, onChange, onRemove }) => (
  <HStack spacing={2}>
    <Input
      name="name"
      placeholder="Full Name"
      value={member.name}
      size="sm"
      onChange={(e) => onChange(e, index)}
    />
    <Input
      name="email"
      placeholder="Email"
      value={member.email}
      size="sm"
      onChange={(e) => onChange(e, index)}
    />
    <Input
      name="role"
      placeholder="Role"
      value={member.role || ""}
      size="sm"
      onChange={(e) => onChange(e, index)}
    />
    <IconButton
      size="sm"
      variant="outline"
      colorPalette="red"
      aria-label="Remove member"
      onClick={() => onRemove(index)}
    >
      <FaRegTrashAlt size={12} />
    </IconButton>
  </HStack>
);

const ProjectEditor = ({ initialValues, onSave, onCancel }) => {
  const [name, setName] = useState(initialValues.name || "");
  const [startDate, setStartDate] = useState(initialValues.startDate || "");
  const [endDate, setEndDate] = useState(initialValues.endDate || "");
  const [members, setMembers] = useState(initialValues.members || []);

  const handleMemberChange = (e, index) => {
    const { name, value } = e.target;
    setMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const handleAddMember = () => {
    setMembers((prev) => [
      ...prev,
      {
        id: generateMemberId(),
        name: "",
        email: "",
        role: "",
        isResponded: false,
        responseContents: "",
        link: `${FEEDBACK_BASE_URL}/feedback/${generateMemberId()}`,
      },
    ]);
  };

  const handleRemoveMember = (index) => {
    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave({
      ...initialValues,
      name,
      startDate,
      endDate,
      members,
    });
  };

  return (
    <Card.Root size="sm" bgColor="blue.50"  _dark={{ bg: "blackAlpha.100" }}>
      <Card.Body padding={3}>
        <VStack spacing={3} align="stretch">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project name"
            size="sm"
          />
          <HStack spacing={3}>
            <Box flex={1}>
              <Text fontSize="sm" mb={1}>
                Start Date
              </Text>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                size="sm"
              />
            </Box>
            <Box flex={1}>
              <Text fontSize="sm" mb={1}>
                End Date (optional)
              </Text>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
                size="sm"
              />
            </Box>
          </HStack>

          {members.map((member, index) => (
            <MemberInput
              key={member.id || index}
              member={member}
              index={index}
              onChange={handleMemberChange}
              onRemove={handleRemoveMember}
            />
          ))}

          <Button onClick={handleAddMember} _dark={{ bg:"whiteAlpha.200"}}>+ Add member</Button>

          <HStack justify="flex-end" spacing={2}>
            <Button size="sm" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              size="sm"
              colorPalette="blue"
              leftIcon={<FaSave size={12} />}
              onClick={handleSave}
              _dark={{ bg:"#528162ff"}}
            >
              Save
            </Button>
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

const CreateCampaign = () => {
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [campaignTitle, setCampaignTitle] = useState("");
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      console.error("User is not available yet. Waiting.");
      return; // Wait for user to be available
    }
  }, [user]);

  const handleSave = (updatedProject) => {
    setProjects((prev) => {
      const exists = prev.find((p) => p.id === updatedProject.id);
      if (exists) {
        return prev.map((p) =>
          p.id === updatedProject.id ? updatedProject : p
        );
      }
      return [
        ...prev,
        {
          ...updatedProject,
          id: crypto.randomUUID(),
          _id: crypto.randomUUID(),
        },
      ];
    });
    setEditingProjectId(null);
  };

  const handleDelete = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCreateCampaign = async () => {
    const campaign = {
      //   _id: crypto.randomUUID(),
      title: campaignTitle,
      createdBy: user._id,
      createdAt: new Date().toISOString(),
      projects: projects.map((p) => ({
        // _id: p._id, TODO: handle _id searching
        title: p.name,
        startDate: p.startDate,
        endDate: p.endDate,
        team: p.members.map((m) => ({
          fullName: m.name,
          email: m.email,
          role: m.role,
          link: m.link,
          isResponded: m.isResponded ?? false,
          responseContents: m.responseContents ?? "",
        })),
      })),
    };
    try {
      const token = await getAccessTokenSilently();
      const newCampaign = await createCampaign(token, campaign);
      if (newCampaign.status === 201) {
        toaster.create({
          title: "Campaign created",
          description: "Your campaign has been created successfully.",
          type: "success",
        });
        navigate('/dashboard');
      } else {
        toaster.create({
          title: "Error creating campaign",
          description: "There was an error creating your campaign.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Token error:", error);
      toaster.create({
        title: "Error",
        description: "Token missing or expired. Please log in again.",
        type: "error",
      });
    }
  };

  return (
    <Box mt={4} width="100%">
      <Span fontSize="2xl" fontWeight="bold">
        Create new campaign
      </Span>

      <Field.Root required mt={3}>
        <Field.Label>
          Campaign Title <Field.RequiredIndicator />
        </Field.Label>
        <Input
          value={campaignTitle}
          onChange={(e) => setCampaignTitle(e.target.value)}
          placeholder="Enter campaign title"
        />
        <Field.ErrorText>This field is required</Field.ErrorText>
      </Field.Root>

      <VStack spacing={3} align="stretch" mt={4}>
        {projects.map((project) =>
          editingProjectId === project.id ? (
            <ProjectEditor
              key={project.id}
              initialValues={project}
              onSave={handleSave}
              onCancel={() => setEditingProjectId(null)}
            />
          ) : (
            <Card.Root
              key={project.id}
              size="sm"
              bgColor="orange.50"
              shadow="md"
              _dark={{ bg: "blackAlpha.100" }}
            >
              <Card.Body padding={3}>
                <Flex justify="space-between" align="center">
                  <Box>
                    <Text fontWeight="bold">{project.name}</Text>
                    <HStack mt={1} spacing={2}>
                      <Badge
                        variant="outline"
                        colorPalette="gray"
                        fontSize="xs"
                      >
                        <FcCalendar /> {project.startDate} -{" "}
                        {project.endDate || "Present"}
                      </Badge>
                      <Badge
                        variant="outline"
                        colorPalette="gray"
                        fontSize="xs"
                      >
                        <FcBusinessman />
                        <FcBusinesswoman /> {project.members.length}
                      </Badge>
                    </HStack>
                  </Box>
                  <HStack>
                    <IconButton
                      size="sm"
                      variant="outline"
                      colorPalette="gray"
                      aria-label="Edit project"
                      onClick={() => setEditingProjectId(project.id)}
                    >
                      <FaEdit size={14} />
                    </IconButton>
                    <IconButton
                      size="sm"
                      variant="outline"
                      colorPalette="gray"
                      aria-label="Delete project"
                      onClick={() => handleDelete(project.id)}
                    >
                      <FaRegTrashAlt size={14} />
                    </IconButton>
                  </HStack>
                </Flex>
              </Card.Body>
            </Card.Root>
          )
        )}

        {editingProjectId === "new" && (
          <ProjectEditor
            initialValues={{
              name: "",
              startDate: "",
              endDate: "",
              members: [],
            }}
            onSave={handleSave}
            onCancel={() => setEditingProjectId(null)}
          />
        )}

        <Button
          leftIcon={<FaPlus />}
          onClick={() => setEditingProjectId("new")}
          mt={2}
          variant="surface"
        >
          Add New Project
        </Button>

        {projects.length > 0 && campaignTitle.trim() && (
          <Button
            size="md"
            mt={2}
            variant={"surface"}
            onClick={handleCreateCampaign}
          >
            Create campaign
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default CreateCampaign;
