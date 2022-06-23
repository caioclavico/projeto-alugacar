import { Flex, FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface NavBarContainerProps {
    children: ReactNode;
    props?: FlexProps;
}

export const NavBarContainer = ({
    children,
    ...props
}: NavBarContainerProps) => {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            mb={8}
            p={[4, 6, 6, 6]}
            bg={["green.500", "green.500", "transparent", "transparent"]}
            color={["white", "white", "green.700", "green.700"]}
            boxShadow="0 0 1em black"
            {...props}
        >
            {children}
        </Flex>
    );
};
