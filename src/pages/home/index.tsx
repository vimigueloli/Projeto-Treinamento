import React from "react";
import nookies from "nookies";

export default function Home() {
    const cookies = nookies.get(null);

    const user = JSON.parse(cookies.USER);

    return (
        <div className="p-4 ">
            <h1>Home</h1>
            <p>usuario {user.email} logado.</p>
        </div>
    );
}
