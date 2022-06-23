import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../../contexts/AuthContext";
import { useCars } from "../../contexts/CarsContext";
import { formatDate } from "../../utils/formatDate";

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

interface ModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    car: Car;
}

export const ModalRent = ({ isOpen, onOpen, onClose, car }: ModalProps) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const { rentCar } = useCars();
    const { token } = useAuth();
    const toast = useToast();

    const formatStartDate = formatDate(startDate);
    const formatEndDate = formatDate(endDate);

    const carId = car.carId;
    const onSubmit = () => {
        const data = {
            start_date: formatStartDate,
            end_date: formatEndDate,
            carId,
        };
        setLoading(true);
        rentCar(data, token)
            .then((_) => {
                setLoading(false);
                onClose();
                toast({
                    title: "Parabens!",
                    description: "Alugado com sucesso!!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                toast({
                    title: "Aconteceu um erro no seu alguel",
                    description: "Por favor, tente  novamente",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Quando pretende alugar?</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Box>
                        <Text>Data de retirada</Text>
                        <DatePicker
                            selected={startDate}
                            onChange={(date: Date) => setStartDate(date)}
                        />
                    </Box>
                    <Box>
                        <Text>Data de entrega</Text>
                        <DatePicker
                            selected={endDate}
                            onChange={(date: Date) => setEndDate(date)}
                        />
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" onClick={onClose}>
                        Fechar
                    </Button>
                    <Button
                        isLoading={loading}
                        colorScheme="green"
                        mr={3}
                        onClick={onSubmit}
                    >
                        Finalizar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
