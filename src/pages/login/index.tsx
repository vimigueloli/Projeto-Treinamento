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
        <div>
            <div onClick={() => setApertado(!apertado)}>Login</div>
            <form onSubmit={(e) => login(e)}>
                <div
                    className={`bg-blue-400 ${
                        apertado ? "w-1/2" : "w-full"
                    } with-transition `}
                >
                    <div>E-mail</div>
                    <input
                        className="input"
                        type="text"
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                    />
                </div>
                <div className="w-1/2">
                    <div>senha</div>
                    <S.Input
                        type="password"
                        value={senha}
                        onChange={(e: any) => setSenha(e.target.value)}
                    />
                </div>
                <div className="line-center ">nova</div>
                <div onClick={() => setApertado(!apertado)} className="button">
                    troca
                </div>
                <Exemplo texto={"Enviar"} />
            </form>
        </div>
    );
}
