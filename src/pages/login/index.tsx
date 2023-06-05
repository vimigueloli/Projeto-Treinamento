import React, { FormEvent, useEffect, useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/router";
import ReactLoading from "react-loading";
import Exemplo from "@/components/Exemplo";
import toast from "react-hot-toast";
import nookies from "nookies";
import * as S from "./styles";

export default function Login() {
    // ! monitor de renderização
    // console.log("teste");

    const router = useRouter();

    // ? javascript
    const [apertado, setApertado] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    // ? de login
    async function login(e: any) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.get(`/signup`);
            const users = response.data.map((item: any) => ({
                email: item.email,
                password: item.password,
                id: item.id,
                fname: item.fname,
            }));

            const selectedUser = users.find(
                (item: any) => item.email === email && item.password === senha
            );
            if (selectedUser === undefined) {
                toast.error("Usuário ou senha incorretos!");
            } else {
                toast.success("Login realizado com sucesso!");
                nookies.set(
                    null,
                    "USER",
                    JSON.stringify({
                        email: selectedUser.email,
                        id: selectedUser.id,
                        fname: selectedUser.fname,
                    })
                );
                router.push("/home");
            }
            setLoading(false);
        } catch (e) {
            console.log("erro ->", e);
            setLoading(false);
            toast.error(`Falha no login: ${e}`);
        }
    }

    // ? html
    return (
        <div className="p-4">
            <div className=" h-screen sm:h-min border-0 border-white p-4 sm:border-2 ">
                {!loading && (
                    <>
                        <div
                            className="mb-8 text-2xl font-semibold"
                            onClick={() => setApertado(!apertado)}
                        >
                            Login
                        </div>
                        <form onSubmit={(e) => login(e)}>
                            <div className="line-left gap-4 flex-wrap">
                                <div className={`w-full sm:w-64`}>
                                    <div className="">E-mail</div>
                                    <input
                                        className="text-center bg-white rounded-lg w-full h-12 border-2 border-white text-black outline-none focus:outline-white with-transition mt-2"
                                        type="text"
                                        value={email}
                                        placeholder="E-mail"
                                        onChange={(e: any) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="w-full sm:w-64 ">
                                    <div className="">Senha</div>
                                    <input
                                        className="text-center bg-white rounded-lg w-full h-12 border-2 border-white text-black outline-none focus:outline-white with-transition mt-2"
                                        type="password"
                                        placeholder="Senha"
                                        value={senha}
                                        onChange={(e: any) =>
                                            setSenha(e.target.value)
                                        }
                                        required
                                        minLength={6}
                                    />
                                </div>
                            </div>
                            <div className="line-right">
                                <button
                                    className="cursor-pointer border-2 w-full h-12 rounded-lg mt-8 border-white text-white line-center bg-black font-semibold
                                    sm:w-32 hover:bg-white hover:text-black with-transition"
                                    type="submit"
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </>
                )}
                {loading && (
                    <div className="line-center w-full h-full sm:h-48">
                        <ReactLoading type="spinningBubbles" color="#fff" />
                    </div>
                )}
            </div>
        </div>
    );
}
