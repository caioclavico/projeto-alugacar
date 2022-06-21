import { Box, IconButton } from "@chakra-ui/react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

interface MenuToggleProps {
    toggle: VoidFunction;
    isOpen: boolean;
}

export const MenuToggle = ({ toggle, isOpen }: MenuToggleProps) => {
    return (
        <Box display={{ base: "block", md: "none" }}>
            <IconButton
                size="md"
                fontSize="lg"
                variant="ghost"
                color="current"
                marginLeft="2"
                onClick={toggle}
                icon={isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                aria-label={isOpen ? "close menu" : "open menu"}
            />
        </Box>
    );
};
