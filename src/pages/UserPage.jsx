import { useEffect, useState } from "react";
import vintageImage from "../assets/vintage.jpg";
import Button from "../components/Button";
import axios from "axios"; 

export default function UserPage() {
        const [userData, setUserData] = useState(null);
        const [error, setError] = useState(null);
        const [isDeleting, setIsDeleting] = useState(false);
        const [isEditing, setIsEditing] = useState(false);
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
    
        useEffect(() => {
            const fetchUserData = async () => {
                try {
                    const token = localStorage.getItem("token");
                    if (!token) {
                        setError("Usuário não autenticado.");
                        return;
                    }
    
                    const decoded = jwtDecode(token); 
                    const userId = decoded.id; 
    
                    const response = await axios.get(`http://localhost:4000/users/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
    
                    setUserData(response.data);
                    setName(response.data.name);
                    setEmail(response.data.email);
                } catch (err) {
                    console.error("Erro ao carregar os dados", err);
                    setError("Erro ao carregar os dados do usuário.");
                }
            };
    
            fetchUserData();
        }, []);
    
        const handleDeleteAccount = async () => {
            if (window.confirm("Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.")) {
                setIsDeleting(true);
                try {
                    const token = localStorage.getItem("token");
                    if (!token) {
                        setError("Usuário não autenticado.");
                        return;
                    }
    
                    const decoded = jwtDecode(token);
                    const userId = decoded.id;
    
                    // Deletando usuário via API
                    await axios.delete(`http://localhost:4000/users/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
    
                    alert("Conta excluída com sucesso!");
                    localStorage.removeItem("token"); 
                    window.location.href = "/"; 
                } catch (error) {
                    setError("Erro ao excluir a conta.");
                    console.error(error);
                } finally {
                    setIsDeleting(false);
                }
            }
        };
    
        const handleEditAccount = () => {
            setIsEditing(true); 
        };
    
        const handleSaveEdit = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("Usuário não autenticado.");
                    return;
                }
    
                const decoded = jwtDecode(token); // Decodificando o token para pegar o userId
                const userId = decoded.id;
    
                const updatedUser = { name, email };
    
                const response = await axios.put(`http://localhost:4000/users/${userId}`, updatedUser, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                setUserData({ ...userData, name, email }); 
                setIsEditing(false); 
                alert("Dados atualizados com sucesso!");
            } catch (error) {
                console.error("Erro ao salvar os dados", error);
                setError("Erro ao salvar os dados.");
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
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-center bg-white rounded-lg shadow-lg mt-10 p-6 max-w-md md:max-w-2xl">
                    <div className="text-center w-full">
                        <h2 className="text-xl font-bold text-gray-800">Minha Conta</h2>
                        <p className="text-gray-600 mt-2">Gerencie seus dados e preferências</p>

                        {error && <p className="text-red-500 mt-2">{error}</p>}

                        {userData ? (
                            <div className="mt-6 text-left">
                                {isEditing ? (
                                    <div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700" htmlFor="name">
                                                Nome:
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                className="w-full p-2 border border-gray-300 rounded"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700" htmlFor="email">
                                                Email:
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                className="w-full p-2 border border-gray-300 rounded"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="m-5 flex gap-4">
                                            <Button onClick={handleSaveEdit} text="Salvar Alterações" />
                                            <Button onClick={() => setIsEditing(false)} text="Cancelar" />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-gray-700"><strong>Nome:</strong> {userData.name}</p>
                                        <p className="text-gray-700"><strong>Email:</strong> {userData.email}</p>

                                        <div className="m-5 flex gap-4">
                                            <Button
                                                onClick={handleDeleteAccount}
                                                disabled={isDeleting}
                                                text={isDeleting ? "Excluindo..." : "Apagar Conta"}
                                            />
                                            <Button
                                                onClick={handleEditAccount}
                                                text="Editar Conta"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="mt-4 text-gray-600">Carregando dados...</p>
                        )}
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