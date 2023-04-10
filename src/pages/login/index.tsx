import React, { FormEvent, useEffect, useState } from "react";
import Exemplo from "components/Exemplo";

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
                <div>
                    <div>E-mail</div>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <div>senha</div>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <Exemplo texto={"Enviar"} />
            </form>
        </div>
    );
}
