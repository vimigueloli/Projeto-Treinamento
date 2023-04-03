import React, { useEffect, useState } from "react";
import * as S from "./styles";

interface ButtomProps {
    texto: string;
}

export default function Exemplo({ texto }: ButtomProps) {
    // ? javascript
    const [apertado, setApertado] = useState<boolean>(false);

    useEffect(() => {
        console.log("executou");
    }, [apertado]);

    // ? html
    return (
        <div>
            <S.Botao
                onClick={() => setApertado(!apertado)}
                color={apertado ? "blue" : "red"}
                textColor={apertado ? "black" : "white"}
            >
                {texto}
            </S.Botao>
        </div>
    );
}
