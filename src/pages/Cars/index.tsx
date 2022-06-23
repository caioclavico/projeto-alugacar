import { Header } from "../../components/Header";
import underConstruction from "../../assets/under_construction.svg";
import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Text,
    VStack,
} from "@chakra-ui/react";

export const Cars = () => {
    return (
        <Flex flexDirection="column">
            <Header />
            <Flex justifyContent="space-around" alignItems="center" p={8}>
                <VStack spacing={10} alignItems="flex-start">
                    <Box color="gray.800">
                        <Heading size="4xl">Oops!</Heading>
                        <Heading size="2xl">Em construção</Heading>
                    </Box>
                    <Text color="gray.500" maxW="450px">
                        Nossos desenvolvedores ainda estao construindo essa
                        pagina, por favor tenha paciencia
                    </Text>
                    <Button
                        bgColor="green.800"
                        color="white"
                        h="50px"
                        w="max-content"
                        borderRadius="25px"
                        _hover={{ bgColor: "green.900" }}
                    >
                        <a href="https://github.com/caioclavico/projeto-alugacar">
                            Mais informação
                        </a>
                    </Button>
                </VStack>
                <Image boxSize={"80vh"} src={underConstruction} />
            </Flex>
        </Flex>
    );
};
