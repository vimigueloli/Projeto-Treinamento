import React, { FormEvent, useEffect, useState } from "react";
import Exemplo from "@/components/Exemplo";
import * as S from "./styles";

export default function Login() {
    // ? javascript
    const [apertado, setApertado] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    // ? de login
    async function login(e: any) {
        e.preventDefault();
        console.log(email);
        console.log(senha);
    }

    // ? html
    return (
        <div className="p-4 ">
            <div className=" border-0 border-white p-4 sm:border-2 ">
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
                            <S.Input
                                type="text"
                                value={email}
                                placeholder="E-mail"
                                onChange={(e: any) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="w-full sm:w-64 ">
                            <div className="">Senha</div>
                            <S.Input
                                type="password"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e: any) => setSenha(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="line-right">
                        <button
                            className="cursor-pointer border-2 w-full h-12 rounded-lg mt-8 border-white text-white line-center bg-black font-semibold
                            sm:w-32 hover:bg-white hover:text-black with-transition"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
