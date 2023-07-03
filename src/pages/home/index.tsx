import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import { MdAddCircleOutline } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Loading from "react-loading";
import nookies from "nookies";
import api from "@/services/api";
import { toast } from "react-hot-toast";

export default function Home() {
    const [users, setUsers] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<any>();
    const [search, setSearch] = useState<string>("");
    const cookies = nookies.get(null);
    const router = useRouter();

    useEffect(() => {
        setUser(JSON.parse(cookies.USER));
    }, []);

    useEffect(() => {
        async function getUsers() {
            const response = await api.get(
                `signup?_limit=10&_page=${page}&q=${search}`
            );

            console.log("response->", response);
            if (response.data.length === 0 && page > 1) {
                toast.error("Não há mais usuários.");
                setPage(page - 1);
                return;
            }
            if (response.data.length === 0) {
                toast.error("Nada encontrado na pesquisa.");
            }
            setUsers(response.data);
        }
        getUsers();
    }, [page, search]);

    async function deleteUser(id: string) {
        try {
            await api.delete(`signup/${id}`);
            toast.success("Usuário deletado com sucesso!");
            router.reload();
        } catch (e: any) {
            toast.error(e.response.data.message);
        }
    }

    return (
        <div className="p-4 ">
            <div className="line-between">
                <div className="text-5xl font-semibold">LOGO</div>
                <div className="line-center flex-col">
                    <div className="w-16 h-16 mb-2 rounded-full bg-white line-center text-black">
                        <div className="text-4xl font-semibold">
                            {user !== undefined && user.fname[0]}
                        </div>
                    </div>
                    <p>Usuário {user !== undefined && user.fname} logado.</p>
                </div>
            </div>
            <div className="line-between mt-8">
                <input
                    type="search"
                    className="text-center bg-white rounded-lg w-full sm:w-64 h-8 border-2 border-white text-black outline-none focus:outline-white with-transition mt-2"
                    placeholder="Pesquisar"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div
                    className="line-left gap-2 cursor-pointer hover:opacity-50 with-transition px-4 py-2 border border-white"
                    onClick={() => router.push(`home/user/create`)}
                >
                    <MdAddCircleOutline size={24} />
                    <div>
                        <p>Adicionar Usuario</p>
                    </div>
                </div>
            </div>
            {!loading ? (
                <>
                    {users.length > 0 ? (
                        <div className="mt-4">
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
                                        <th className="border text-center">
                                            Ações
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
                                                <td className="border text-center">
                                                    <div className="line-center gap-4 py-2">
                                                        <RiEditLine
                                                            size={22}
                                                            className="cursor-pointer with-transition hover:opacity-50"
                                                            onClick={() =>
                                                                router.push(
                                                                    `/home/user/${user.id}`
                                                                )
                                                            }
                                                        />
                                                        <IoIosCloseCircleOutline
                                                            size={22}
                                                            className="cursor-pointer with-transition hover:opacity-50"
                                                            onClick={() =>
                                                                deleteUser(
                                                                    user.id
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                            <div className="line-center gap-1 mt-4">
                                <div>
                                    {page === 1 ? (
                                        <div className="opacity-50">
                                            <BiLeftArrow />
                                        </div>
                                    ) : (
                                        <div
                                            className="hover:opacity-50 cursor-pointer with-transition"
                                            onClick={() => setPage(page - 1)}
                                        >
                                            <BiLeftArrow />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p>{page}</p>
                                </div>
                                <div
                                    className="cursor-pointer hover:opacity-50 with-transition"
                                    onClick={() => setPage(page + 1)}
                                >
                                    <BiRightArrow />
                                </div>
                            </div>
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
