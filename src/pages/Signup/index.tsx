import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    Heading,
    HStack,
    Image,
    Select,
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

const signupSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    email: yup.string().required("Email obrigatório").email("Email invalido"),
    password: yup.string().required("Senha obrigatória"),
    cpf: yup
        .string()
        .required()
        .matches(/^[0-9]+$/, "Apenas numeros")
        .min(11, "CPF invalido")
        .max(11, "CPF invalido"),
    licenseCategory: yup.string().required(),
    license: yup.boolean().optional(),
});

interface OnSubmitData {
    name: string;
    email: string;
    password: string;
    cpf: string;
    licenseCategory: string;
    license?: boolean;
}
export const Signup = () => {
    const [loading, setLoading] = useState(false);

    const { signUp } = useAuth();

    const navigate = useNavigate();

    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm<OnSubmitData>({ resolver: yupResolver(signupSchema) });

    const toast = useToast();

    const onSubmit = (data: OnSubmitData) => {
        setLoading(true);
        console.log(data);
        signUp(data)
            .then((_) => {
                setLoading(false);
                toast({
                    title: "Parabens!",
                    description: "Cadastro realizado com sucesso!!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                toast({
                    title: "Aconteceu um erro no seu cadastro",
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
                "Linear(to-l, green.300 65%, white 35%)",
                "Linear(to-l, green.300 65%, white 35%)",
            ]}
            h={["auto", "auto", "100vh", "100vh"]}
            color="white"
        >
            <Flex
                w="100%"
                justifyContent="center"
                flexDirection={["column", "column", "row", "row"]}
                alignItems="center"
            >
                <Grid
                    as="form"
                    onSubmit={handleSubmit(onSubmit)}
                    mt={4}
                    mr={10}
                    w={["100%", "100%", "35%", "35%"]}
                    padding="30px 15px"
                    border="3px solid"
                    borderColor="green"
                    borderRadius="10px"
                    bg="white"
                    color="gray.900"
                >
                    <Heading size="lg">Faça seu cadastro!</Heading>
                    <VStack spacing={1} mt={2}>
                        <Input
                            h="50px"
                            icon={FaLock}
                            placeholder="Digite seu nome"
                            label="Nome"
                            type="text"
                            error={errors.name}
                            {...register("name")}
                        />
                        <Box w="100%">
                            <Input
                                h="50px"
                                icon={FaEnvelope}
                                placeholder="Digite seu email"
                                label="Email"
                                type="email"
                                error={errors.email}
                                {...register("email")}
                            />
                        </Box>
                        <Input
                            h="50px"
                            icon={FaLock}
                            placeholder="Digite sua senha"
                            label="Senha"
                            type="password"
                            error={errors.password}
                            {...register("password")}
                        />
                        <Input
                            h="50px"
                            icon={FaLock}
                            placeholder="Digite seu CPF"
                            label="CPF"
                            type="name"
                            error={errors.cpf}
                            {...register("cpf")}
                        />
                        <FormControl>
                            <FormLabel>Categoria</FormLabel>
                            <Select
                                placeholder="Selecione sua categoria"
                                isRequired
                                {...register("licenseCategory")}
                            >
                                <option value="A">A</option>
                                <option value="AB">AB</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                            </Select>
                        </FormControl>
                    </VStack>
                    <VStack mt={4} spacing={5}>
                        <HStack w="100%">
                            <Button
                                isLoading={loading}
                                type="submit"
                                w="100%"
                                bgColor="green.800"
                                color="white"
                                h="50px"
                                borderRadius="8px"
                                _hover={{ bgColor: "green.900" }}
                            >
                                Cadastrar
                            </Button>
                            <Box w="100%">
                                <Button
                                    onClick={() => navigate("/login")}
                                    w="100%"
                                    bgColor="gray.100"
                                    color="gray.300"
                                    h="50px"
                                    borderRadius="8px"
                                    _hover={{ bgColor: "gray.200" }}
                                >
                                    Entrar
                                </Button>
                            </Box>
                        </HStack>
                    </VStack>
                </Grid>
                <Grid
                    w={["100%", "100%", "50%", "50%"]}
                    justifyItems={["none", "none", "center", "center"]}
                    justifyContent="center"
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
            </Flex>
        </Flex>
    );
};
