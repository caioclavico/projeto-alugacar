import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

interface CarsProviderProps {
    children: ReactNode;
}

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

interface RentCar {
    carId: string;
    start_date: string;
    end_date: string;
}

interface CarsContexData {
    cars: Car[];
    AllCars: (token: string) => Promise<void>;
    rentCar: (credentials: RentCar, token: string) => Promise<void>;
}

const CarsContext = createContext<CarsContexData>({} as CarsContexData);

const useCars = () => {
    const context = useContext(CarsContext);

    if (!context) {
        throw new Error("useCars must be used within an CarsProvider");
    }

    return context;
};

const CarsProvider = ({ children }: CarsProviderProps) => {
    const { signOut } = useAuth();

    const [cars, setCars] = useState<Car[]>([]);

    const AllCars = useCallback(
        async (token: string) => {
            try {
                const response = await api.get("cars", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCars(response.data.cars);
            } catch (err) {
                console.log(err);
                signOut();
            }
        },
        [signOut]
    );

    const rentCar = useCallback(async (data: RentCar, token: string) => {
        await api.post("rent/create", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }, []);

    return (
        <CarsContext.Provider value={{ cars, AllCars, rentCar }}>
            {children}
        </CarsContext.Provider>
    );
};

export { CarsProvider, useCars };
