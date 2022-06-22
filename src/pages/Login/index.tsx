import {
    Box,
    Button,
    Flex,
    Grid,
    Heading,
    Image,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import illustration from "../../assets/transport-scene.svg";
import { FaEnvelope, FaLock } from "react-icons/fa";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const signInSchema = yup.object().shape({
    email: yup.string().required("Email obrigatório").email("Email invalido"),
    password: yup.string().required("Senha obrigatória"),
});

interface OnSubmitData {
    email: string;
    password: string;
}
export const Login = () => {
    const [loading, setLoading] = useState(false);

    const { signIn } = useAuth();

    const navigate = useNavigate();

    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm<OnSubmitData>({ resolver: yupResolver(signInSchema) });

    const toast = useToast();

    const onSubmit = (data: OnSubmitData) => {
        setLoading(true);
        signIn(data)
            .then((_) => setLoading(false))
            .catch((err) => {
                console.log(err);
                setLoading(false);
                toast({
                    title: "Email ou senha invalido",
                    description: "Por favor, tente  novamente",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    return (
        <Flex
            padding={["10px 15px", "10px 15px", "0", "0"]}
            bgGradient={[
                "Linear(to-b, green.300 65%, white 35%)",
                "Linear(to-b, green.300 65%, white 35%)",
                "Linear(to-r, green.300 65%, white 35%)",
                "Linear(to-r, green.300 65%, white 35%)",
            ]}
            h={["auto", "auto", "100vh", "100vh"]}
            color="white"
        >
            <Flex
                w={["100%", "100%", "90%", "90%"]}
                justifyContent="center"
                flexDirection={["column", "column", "row", "row"]}
                alignItems="center"
            >
                <Grid
                    w={["100%", "100%", "50%", "50%"]}
                    paddingRight="100px"
                    justifyItems={["none", "none", "center", "center"]}
                >
                    <Flex
                        flexDirection="column"
                        w={["max-content", "full", "full", "full"]}
                    >
                        <Button
                            onClick={() => navigate("/")}
                            variant="link"
                            color="green.800"
                            alignSelf={[
                                "flex-end",
                                "flex-end",
                                "flex-start",
                                "flex-start",
                            ]}
                            position="absolute"
                            top="50px"
                        >
                            Voltar
                        </Button>
                        <Image
                            src={illustration}
                            alt="logo"
                            w={["120px", "120px", "350px", "350px"]}
                        />
                        <Heading as="h1">Aluga Car</Heading>
                        <Text>Um jeito facil de alugar seu carro</Text>
                    </Flex>
                </Grid>
                <Grid
                    as="form"
                    onSubmit={handleSubmit(onSubmit)}
                    mt={4}
                    w={["100%", "100%", "35%", "35%"]}
                    padding="30px 15px"
                    border="3px solid"
                    borderColor="green"
                    borderRadius="10px"
                    bg="white"
                    color="gray.900"
                >
                    <Heading size="lg">Bem vindo de volta!</Heading>
                    <VStack spacing={5} mt={6}>
                        <Box w="100%">
                            <Input
                                icon={FaEnvelope}
                                placeholder="Digite seu email"
                                label="Email"
                                type="email"
                                error={errors.email}
                                {...register("email")}
                            />
                            {!errors.email && (
                                <Text ml={1} mt={1} color="gray.300">
                                    Exemplo: nome@email.com
                                </Text>
                            )}
                        </Box>
                        <Input
                            icon={FaLock}
                            placeholder="Digite sua senha"
                            label="Senha"
                            type="password"
                            error={errors.password}
                            {...register("password")}
                        />
                    </VStack>
                    <VStack mt={4} spacing={5}>
                        <Button
                            isLoading={loading}
                            type="submit"
                            w="100%"
                            bgColor="green.800"
                            color="white"
                            h="60px"
                            borderRadius="8px"
                            _hover={{ bgColor: "green.900" }}
                        >
                            Entrar
                        </Button>
                        <Text color="gray.400">
                            Ainda nao possui uma conta?
                        </Text>
                        <Button
                            onClick={() => navigate("/signup")}
                            w="100%"
                            bgColor="gray.100"
                            color="gray.300"
                            h="60px"
                            borderRadius="8px"
                            _hover={{ bgColor: "gray.200" }}
                        >
                            Cadastrar
                        </Button>
                    </VStack>
                </Grid>
            </Flex>
        </Flex>
    );
};
