import { useState, useReducer, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook de navegação
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import vintageImage from "../assets/vintage.jpg";

const formReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_SIGN_UP':
            return { ...state, isSignUp: !state.isSignUp, isForgot: false };
        case 'TOGGLE_FORGOT':
            return { ...state, isForgot: !state.isForgot, isSignUp: false };
        case 'RESET_TO_LOGIN':
            return { ...state, isSignUp: false, isForgot: false };
        default:
            return state;
    }
};

export default function SignInSignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState(""); // Novo estado para o nome
    const [formState, dispatch] = useReducer(formReducer, { isSignUp: false, isForgot: false });
    const [message, setMessage] = useState(""); // Feedback para o usuário
    const [loading, setLoading] = useState(false); // Estado de carregamento
    const navigate = useNavigate(); // Hook de navegação

    const toggleForm = useCallback(() => dispatch({ type: 'TOGGLE_SIGN_UP' }), []);
    const toggleForgot = useCallback(() => dispatch({ type: 'TOGGLE_FORGOT' }), []);
    const resetToLogin = useCallback(() => dispatch({ type: 'RESET_TO_LOGIN' }), []);

    const validatePassword = useCallback((password) => {
        const minLength = password.length >= 8;
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[@$!%*?&]/.test(password);
        return { minLength, hasNumber, hasSpecialChar };
    }, []);

    const passwordValidation = useMemo(() => validatePassword(password), [password, validatePassword]);
    const passwordMatch = useMemo(() => password === confirmPassword, [password, confirmPassword]);

    // Função para registro
    const handleRegister = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setMessage("O campo 'Nome' é obrigatório.");
            return;
        }
        if (!passwordMatch) {
            setMessage("As senhas não coincidem.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:4000/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name, // Inclui o nome na requisição
                    email,
                    password,
                    isAdmin: false,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Registro realizado com sucesso!");
                resetToLogin(); // Volta para o formulário de login
            } else {
                setMessage(data.message || "Erro ao registrar.");
            }
        } catch (error) {
            setMessage("Erro na comunicação com o servidor.");
        } finally {
            setLoading(false);
        }
    };

    // Função para login
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("http://localhost:4000/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Login realizado com sucesso!");
                localStorage.setItem("token", data.token); // Armazena o token
                navigate("/user"); // Redireciona para a página /user
            } else {
                setMessage(data.message || "Erro ao fazer login.");
            }
        } catch (error) {
            setMessage("Erro na comunicação com o servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-full h-screen">
            <img
                src={vintageImage}
                alt="Imagem vintage com fundo escuro"
                className="absolute inset-0 w-full h-full object-cover md:hidden"
            />
            <div className="flex items-center justify-center w-full h-full px-4 md:px-0">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-center bg-[var(--neutral-light)] rounded-[var(--border-radius)] shadow-[var(--box-shadow)] mt-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full md:w-1/2 z-0">
                        <h2 className="text-xl font-bold text-gray-800">
                            {formState.isSignUp ? "Crie sua conta" : formState.isForgot ? "Recuperação de senha" : "Bem-vindo de volta!"}
                        </h2>
                        <p className="text-gray-600 mt-2">
                            {formState.isSignUp ? "Crie uma conta para começar" : formState.isForgot ? "Digite seu e-mail para recuperar sua senha" : "Faça login para continuar"}
                        </p>

                        {!formState.isForgot && (
                            <>
                                {/* Campo de Nome (apenas no cadastro) */}
                                {formState.isSignUp && (
                                    <div className="flex flex-col mt-4 text-left">
                                        <label htmlFor="name" className="text-gray-700 font-medium">
                                            Nome
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="border-2 border-gray-300 p-2 rounded-md text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] w-full"
                                            placeholder="Digite seu nome"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col mt-4 text-left">
                                    <label htmlFor="email" className="text-gray-700 font-medium">
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="border-2 border-gray-300 p-2 rounded-md text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] w-full"
                                        placeholder="Digite seu e-mail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col mt-4 text-left relative">
                                    <label htmlFor="password" className="text-gray-700 font-medium">
                                        Senha
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            className="border-2 border-gray-300 p-2 rounded-md text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] w-full pr-10"
                                            placeholder="Digite sua senha"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-3 text-gray-500"
                                            onClick={() => setShowPassword(!showPassword)}
                                            aria-label="Mostrar/ocultar senha"
                                        >
                                            {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                                        </button>
                                    </div>
                                    {formState.isSignUp && (
                                        <div className="mt-2 text-xs text-gray-600">
                                            <p className={passwordValidation.minLength ? "text-green-500" : "text-red-500"}>
                                                {passwordValidation.minLength ? "✔" : "✖"} Mínimo de 8 caracteres
                                            </p>
                                            <p className={passwordValidation.hasNumber ? "text-green-500" : "text-red-500"}>
                                                {passwordValidation.hasNumber ? "✔" : "✖"} Pelo menos um número
                                            </p>
                                            <p className={passwordValidation.hasSpecialChar ? "text-green-500" : "text-red-500"}>
                                                {passwordValidation.hasSpecialChar ? "✔" : "✖"} Pelo menos um caractere especial
                                            </p>
                                        </div>
                                    )}
                                </div>
                                {formState.isSignUp && (
                                    <div className="flex flex-col mt-4 text-left relative">
                                        <label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                                            Confirmar Senha
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                id="confirmPassword"
                                                className="border-2 border-gray-300 p-2 rounded-md text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] w-full pr-10"
                                                placeholder="Confirme sua senha"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-3 text-gray-500"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                aria-label="Mostrar/ocultar senha"
                                            >
                                                {showConfirmPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                                            </button>
                                        </div>
                                        {!passwordMatch && confirmPassword && (
                                            <p className="text-red-500 text-xs mt-1">As senhas não coincidem.</p>
                                        )}
                                    </div>
                                )}
                                <button
                                    className="mt-6 w-full py-2 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--secondary-color)] transition cursor-pointer"
                                    disabled={formState.isSignUp && (!passwordMatch || loading || !name.trim())}
                                    onClick={formState.isSignUp ? handleRegister : handleLogin}
                                >
                                    {loading ? "Carregando..." : formState.isSignUp ? "Criar Conta" : "Entrar"}
                                </button>
                            </>
                        )}
                        {formState.isForgot && (
                            <div className="flex flex-col mt-4 text-left">
                                <label htmlFor="forgotEmail" className="text-gray-700 font-medium">
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    id="forgotEmail"
                                    className="border-2 border-gray-300 p-2 rounded-md text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] w-full"
                                    placeholder="Digite seu e-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button
                                    className="mt-6 w-full py-2 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--secondary-color)] transition cursor-pointer"
                                >
                                    Enviar e-mail
                                </button>
                            </div>
                        )}
                        <div className="mt-4">
                            <p>{formState.isSignUp ? "Já tem uma conta?" : formState.isForgot ? "Voltar ao login" : "Não tem uma conta?"}</p>
                            <button
                                onClick={formState.isForgot ? resetToLogin : toggleForm}
                                className="text-[var(--primary-color)] font-medium hover:underline cursor-pointer"
                            >
                                {formState.isSignUp ? "Entrar" : formState.isForgot ? "Voltar" : "Registrar"}
                            </button>
                            {!formState.isForgot && !formState.isSignUp && (
                                <div className="mt-4">
                                    <button
                                        onClick={toggleForgot}
                                        className="text-[var(--primary-color)] font-medium hover:underline cursor-pointer"
                                    >
                                        Esqueceu a senha?
                                    </button>
                                </div>
                            )}
                        </div>
                        {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
                    </div>
                    <div className="hidden md:block md:w-1/2">
                        <img
                            src={vintageImage}
                            alt="Imagem vintage com fundo escuro"
                            className="w-full h-auto object-cover max-w-[500px] mx-auto md:max-w-[400px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}