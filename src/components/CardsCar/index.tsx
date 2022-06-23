import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Flex,
    Grid,
    Heading,
    Icon,
    IconProps,
    Image,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import carImg from "../../assets/car.png";
import { GiGearStickPattern, GiCalendar } from "react-icons/gi";
import formatValue from "../../utils/formatValue";
import { ModalRent } from "../ModalRent";
import "react-datepicker/dist/react-datepicker.css";

interface Car {
    carId: string;
    model: string;
    brand: string;
    plate: string;
    color: string;
    transmission: string;
    year: string;
    mileage: string;
    dailyPrice: number;
    available: boolean;
}

interface CardsCarProps {
    car: Car;
}

export const CardsCar = ({ car }: CardsCarProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const CircleIcon = (props: IconProps) => (
        <Icon viewBox="0 0 200 200" {...props}>
            <path
                fill="currentColor"
                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
            />
        </Icon>
    );

    return (
        <Flex
            flexDirection="column"
            maxW="300px"
            border="1px solid"
            borderColor="gray.800"
            borderRadius="10px"
            h="max-content"
            p={4}
            gap={8}
        >
            <ModalRent
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                car={car}
            />
            <Image src={carImg} alt="imagem carro" />
            <VStack spacing={6}>
                <Heading size="md" color="gray.700">
                    {car.model} - {car.brand}
                </Heading>
                <Accordion allowToggle w="100%">
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box
                                    flex="1"
                                    textAlign="left"
                                    color="green.400"
                                >
                                    Mais detalhes
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Grid templateColumns="repeat(2, 4fr)" gap={4}>
                                <Flex
                                    bg="gray.200"
                                    alignItems="center"
                                    w="max-content"
                                    p={2}
                                    borderRadius="5px"
                                    gap={2}
                                    minW="100px"
                                >
                                    <Icon as={GiGearStickPattern} />
                                    <Text>{car.transmission}</Text>
                                </Flex>
                                <Flex
                                    bg="gray.200"
                                    alignItems="center"
                                    w="max-content"
                                    p={2}
                                    borderRadius="5px"
                                    gap={2}
                                    minW="100px"
                                >
                                    <CircleIcon color="black" />
                                    <Text>{car.color}</Text>
                                </Flex>
                                <Flex
                                    bg="gray.200"
                                    alignItems="center"
                                    w="max-content"
                                    p={2}
                                    borderRadius="5px"
                                    gap={2}
                                    minW="100px"
                                >
                                    <Icon as={GiCalendar} />
                                    <Text>{car.year}</Text>
                                </Flex>
                            </Grid>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>

                <Heading color="green.400" size="lg">
                    {formatValue(car.dailyPrice)}
                </Heading>

                <Button
                    w="100%"
                    bgColor="green.800"
                    color="white"
                    h="60px"
                    borderRadius="8px"
                    _hover={{ bgColor: "green.900" }}
                    onClick={onOpen}
                >
                    Alugar
                </Button>
            </VStack>
        </Flex>
    );
};
