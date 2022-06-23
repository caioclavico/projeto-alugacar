import { Grid } from "@chakra-ui/react";
import { useEffect } from "react";
import { CardsCar } from "../../components/CardsCar";
import { Header } from "../../components/Header";
import { useAuth } from "../../contexts/AuthContext";
import { useCars } from "../../contexts/CarsContext";

export const Dashboard = () => {
    const { token } = useAuth();
    const { cars, AllCars } = useCars();
    useEffect(() => {
        AllCars(token);
    }, [token, AllCars]);
    return (
        <>
            <Header />
            <Grid
                w="100%"
                templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                gap={10}
                paddingX="8"
                mt="8"
                justifyItems="center"
            >
                {cars.map((item, key) => (
                    <CardsCar car={item} key={key} />
                ))}
            </Grid>
        </>
    );
};
