import React, { useEffect, useState } from "react";
import Exemplo from "../../components/Exemplo";

export default function Login() {
    // ? javascript
    const [apertado, setApertado] = useState<boolean>(false);

    // ? html
    return (
        <div>
            <div onClick={() => setApertado(!apertado)}>Login</div>
            <Exemplo texto={"botão 1"} />
        </div>
    );
}
