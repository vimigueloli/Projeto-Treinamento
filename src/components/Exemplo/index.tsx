import React from "react";

interface ButtomProps {
    texto: string;
}

export default function Exemplo({ texto }: ButtomProps) {
    // ? javascript

    // ? html
    return (
        <div>
            <button>{texto}</button>
        </div>
    );
}
