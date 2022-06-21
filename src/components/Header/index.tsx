import { Flex, FlexProps, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { Logo } from "../Logo/Logo";
import { MenuLinks } from "./MenuLinks";
import { MenuToggle } from "./MenuToggle";
import { NavBarContainer } from "./NavBarContainer";

export const Header = (props: FlexProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <NavBarContainer {...props}>
            <Flex gap={[4, 4, 8, 8]} alignItems="center">
                <Logo
                    w={["30px", "30px", "50px", "50px"]}
                    color={["white", "white", "green.500", "green.500"]}
                />
                <Heading fontSize={["20px", "30px", "30px", "30px"]}>
                    Aluga Car
                </Heading>
            </Flex>
            <MenuToggle toggle={toggle} isOpen={isOpen} />
            <MenuLinks isOpen={isOpen} />
        </NavBarContainer>
    );
};
