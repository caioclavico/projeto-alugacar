import { Link, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface MenuItemProps {
    children: ReactNode;
    isLast?: boolean;
    to?: string;
}

export const MenuItem = ({
    children,
    isLast = false,
    to = "/",
    ...rest
}: MenuItemProps) => {
    return (
        <Link href={to}>
            <Text display="block" {...rest}>
                {children}
            </Text>
        </Link>
    );
};
