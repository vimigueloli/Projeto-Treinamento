import React, { useState, useEffect } from "react";
import Loading from "react-loading";
import nookies from "nookies";
import api from "@/services/api";

export default function Home() {
    const [users, setUsers] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const cookies = nookies.get(null);

    const user = JSON.parse(cookies.USER);

    useEffect(() => {
        async function getUsers() {
            const response = await api.get(`signup?_limit=2&_page=${page}`);
            console.log("response->", response);
            setUsers(response.data);
        }
        getUsers();
    }, []);

    return (
        <div className="p-4 ">
            <div className="line-between">
                <div className="text-5xl font-semibold">LOGO</div>
                <div className="line-center flex-col">
                    <div className="w-16 h-16 mb-2 rounded-full bg-white line-center text-black">
                        <div className="text-4xl font-semibold">
                            {user.fname[0]}
                        </div>
                    </div>
                    <p>Usuário {user.fname} logado.</p>
                </div>
            </div>

            {!loading ? (
                <>
                    {users.length > 0 ? (
                        <div className="mt-16">
                            <table className="border w-full border-white">
                                <thead className="border">
                                    <tr className="border">
                                        <th className="border text-center">
                                            id
                                        </th>
                                        <th className="border text-center">
                                            Primeiro Nome
                                        </th>
                                        <th className="border text-center">
                                            Ultimo Nome
                                        </th>
                                        <th className="border text-center">
                                            E-mail
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="border">
                                    {users.map((user) => (
                                        <>
                                            <tr className="border">
                                                <td className="border text-center">
                                                    {user.id}
                                                </td>
                                                <td className="border text-center">
                                                    {user.fname}
                                                </td>
                                                <td className="border text-center">
                                                    {user.lname}
                                                </td>
                                                <td className="border text-center">
                                                    {user.email}
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="line-center text-3xl text-white">
                            <p>Nenhum usuário encontrado.</p>
                        </div>
                    )}
                </>
            ) : (
                <div className="line-center">
                    <Loading type="spin" />
                </div>
            )}
        </div>
    );
}
