import { ChakraProvider, theme } from "@chakra-ui/react";
import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { CarsProvider } from "./CarsContext";

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
    <AuthProvider>
        <CarsProvider>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CarsProvider>
    </AuthProvider>
);
