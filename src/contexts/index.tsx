import { ChakraProvider, theme } from "@chakra-ui/react";
import { ReactNode } from "react";

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
);
