import { Box, Button, Stack } from "@chakra-ui/react";
import { useAuth } from "../../../contexts/AuthContext";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";

import { MenuItem } from "../MenuItem";

interface MenuLinksProps {
    isOpen: boolean;
}
export const MenuLinks = ({ isOpen }: MenuLinksProps) => {
    const { token, signOut } = useAuth();
    return (
        <Box
            display={{ base: isOpen ? "block" : "none", md: "block" }}
            flexBasis={{ base: "100%", md: "auto" }}
        >
            <Stack
                spacing={8}
                align="center"
                justify={["center", "space-between", "flex-end", "flex-end"]}
                direction={["column", "row", "row", "row"]}
                pt={[4, 4, 0, 0]}
            >
                <MenuItem to="/">Home</MenuItem>
                <MenuItem to="/cars">Carros </MenuItem>
                {token && <MenuItem to="/dashboard">Minhas reservas</MenuItem>}
                {!token && <MenuItem to="/login">Login </MenuItem>}
                {!token && (
                    <MenuItem to="/signup" isLast>
                        <Button
                            size="sm"
                            rounded="md"
                            color={["green.500", "green.500", "white", "white"]}
                            bg={["white", "white", "green.500", "green.500"]}
                            _hover={{
                                bg: [
                                    "green.100",
                                    "green.100",
                                    "green.600",
                                    "green.600",
                                ],
                            }}
                        >
                            Criar Conta
                        </Button>
                    </MenuItem>
                )}

                {token && (
                    <Button
                        size="sm"
                        rounded="md"
                        color={["green.500", "green.500", "white", "white"]}
                        bg={["white", "white", "green.500", "green.500"]}
                        _hover={{
                            bg: [
                                "green.100",
                                "green.100",
                                "green.600",
                                "green.600",
                            ],
                        }}
                        onClick={signOut}
                    >
                        Sair
                    </Button>
                )}

                <ColorModeSwitcher />
            </Stack>
        </Box>
    );
};
