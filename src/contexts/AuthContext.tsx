import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from "react";
import api from "../services/api";

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthState {
    token: string;
}

interface SignInData {
    email: string;
    password: string;
}

interface SignUpData {
    name: string;
    email: string;
    password: string;
    cpf: string;
    licenseCategory: string;
    license?: boolean;
}

interface AuthContexData {
    token: string;
    signIn: (credentials: SignInData) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpData) => Promise<void>;
}

const AuthContext = createContext<AuthContexData>({} as AuthContexData);

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem("@AlugaCar:token");

        if (token) {
            return { token };
        }
        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, password }: SignInData) => {
        const response = await api.post("users/login", { email, password });

        const { token } = response.data;

        localStorage.setItem("@AlugaCar:token", token);

        setData({ token });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem("@AlugaCar:token");
        setData({} as AuthState);
    }, []);

    const signUp = useCallback(async (data: SignUpData) => {
        await api.post("users/register", data);
    }, []);

    return (
        <AuthContext.Provider
            value={{ signIn, token: data.token, signOut, signUp }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };
