import {
    Box,
    Button,
    Card,
    HStack,
    VStack,
    Input,
    Field,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const UserAccountForm = ({ dbUser, onSave, onCancel }) => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            firstName: dbUser.firstName || "",
            lastName: dbUser.lastName || "",
            username: dbUser.username || "",
            email: dbUser.email || "",
        },
    });

    const onSubmit = (data) => {
        onSave(data);
    };

    return (  
        <Card.Root
            bgColor="orange.50"
            shadow="md"
            maxW="600px"
            mx="auto"
            my={6}
            _dark={{ bg:"blackAlpha.100"}}
        >
            <Card.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack spacing={4} align="stretch">
                        
                        {/* First Name */}
                        <Field.Root invalid={!!errors.firstName} required mt={3}>
                            <Field.Label fontWeight="bold">
                                First name <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                                type="text"
                                placeholder="First name"
                                bg="white"
                                _dark={{ bg:"whiteAlpha.300"}}
                                {...register("firstName", {
                                required: "First name is required",
                                pattern: {
                                    value: /^[a-zA-Z\s'-]+$/,
                                    message: "Only letters, spaces, hyphens, and apostrophes are allowed"
                                },
                                maxLength: {
                                    value: 50,
                                    message: "Must be 50 characters or less"
                                }
                                })}
                            />
                            <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
                        </Field.Root>

                        {/* Last Name */}
                        <Field.Root invalid={!!errors.lastName} required mt={3}>
                            <Field.Label fontWeight="bold">
                                Last name <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                                type="text"
                                placeholder="Last name"
                                bg="white"
                                _dark={{ bg:"whiteAlpha.300"}}
                                {...register("lastName", {
                                required: "Last name is required",
                                pattern: {
                                    value: /^[a-zA-Z\s'-]+$/,
                                    message: "Only letters, spaces, hyphens, and apostrophes are allowed"
                                },
                                maxLength: {
                                    value: 50,
                                    message: "Must be 50 characters or less"
                                }
                                })}
                            />
                            <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
                        </Field.Root>

                        {/* Username */}
                        <Field.Root invalid={!!errors.username} mt={3}>
                            <Field.Label fontWeight="bold">
                                Username
                            </Field.Label>
                            <Input
                                type="text"
                                placeholder="Username"
                                bg="white"
                                _dark={{ bg:"whiteAlpha.300"}}
                                {...register("username", {
                                pattern: {
                                    value: /^[a-zA-Z0-9_]+$/,
                                    message: "Only letters, numbers, and underscores allowed"
                                },
                                minLength: {
                                    value: 3,
                                    message: "Must be at least 3 characters"
                                },
                                maxLength: {
                                    value: 30,
                                    message: "Must be 30 characters or less"
                                }})}
                            />
                            <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
                        </Field.Root>

                        {/* Email */}
                        <Field.Root invalid={!!errors.email} required mt={3}>
                            <Field.Label fontWeight="bold">
                                Email <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                                type="email"
                                placeholder="Email"
                                bg="white"
                                _dark={{ bg:"whiteAlpha.300"}}
                                {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                    message: "Invalid email address",
                                },
                                })}
                            />
                            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                        </Field.Root>

                        {/* Buttons */}
                        <HStack justify="flex-end">
                            <Button
                                variant="ghost"
                                onClick={onCancel}
                                type="button"
                            >
                                Cancel
                            </Button>
                            <Button
                                colorPalette="blue"
                                type="submit"
                                isLoading={isSubmitting}
                            >
                                Save
                            </Button>
                        </HStack>
                    </VStack>
                </form>
            </Card.Body>
        </Card.Root>        
    );
};

export default UserAccountForm;
