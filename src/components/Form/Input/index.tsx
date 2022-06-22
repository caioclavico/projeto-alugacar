import {
    FormControl,
    FormLabel,
    InputGroup,
    InputLeftElement,
    Input as ChakraInput,
    InputProps as ChakraInputProps,
    FormErrorMessage,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";
import { IconType } from "react-icons/lib";
import {
    forwardRef,
    ForwardRefRenderFunction,
    useCallback,
    useEffect,
    useState,
} from "react";

interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
    error?: FieldError | null;
    icon?: IconType;
}

type inputVariationOptions = { [key: string]: string };

const inputVariation: inputVariationOptions = {
    error: "red.500",
    default: "gray.400",
    focus: "orange",
    filled: "green.500",
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
    { name, error = null, icon: Icon, label, ...rest },
    ref
) => {
    const [variation, setVariation] = useState("default");

    const [value, setValue] = useState("");

    useEffect(() => {
        if (error) {
            return setVariation("error");
        }
    }, [error]);

    const handlerInputFocus = useCallback(() => {
        if (!error) {
            setVariation("focus");
        }
    }, [error]);

    const handlerInputBlur = useCallback(() => {
        if (value.length > 1 && !error) {
            setVariation("filled");
        }
    }, [error, value]);

    return (
        <FormControl isInvalid={!!error}>
            {!!label && <FormLabel>{label}</FormLabel>}

            <InputGroup flexDirection="column">
                {Icon && (
                    <InputLeftElement
                        color={inputVariation[variation]}
                        mt="2.5"
                    >
                        <Icon />
                    </InputLeftElement>
                )}

                <ChakraInput
                    name={name}
                    color={inputVariation[variation]}
                    borderColor={inputVariation[variation]}
                    onFocus={handlerInputFocus}
                    onBlurCapture={handlerInputBlur}
                    onChangeCapture={(e) => {
                        setValue(e.currentTarget.value);
                    }}
                    bg="gray.50"
                    variant="outline"
                    _hover={{ bgColor: "gray.100" }}
                    _placeholder={{ color: "gray.300" }}
                    size="lg"
                    h="60px"
                    ref={ref}
                    {...rest}
                />
                {!!error && (
                    <FormErrorMessage>{error.message}</FormErrorMessage>
                )}
            </InputGroup>
        </FormControl>
    );
};

export const Input = forwardRef(InputBase);
