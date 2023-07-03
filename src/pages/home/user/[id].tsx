import api from "@/services/api";
import React, { useEffect, useState } from "react";
import { FormEvent } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import ReactLoading from "react-loading";

export default function UserForm({ id }: any) {
    const [senha, setSenha] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [fname, setFname] = useState<string>("");
    const [lname, setLname] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        async function getUser() {
            if (id !== "create") {
                setLoading(true);
                try {
                    const response = await api.get(`signup/${id}`);
                    setSenha(response.data.password);
                    setEmail(response.data.email);
                    setFname(response.data.fname);
                    setLname(response.data.lname);
                    setLoading(false);
                } catch {
                    toast.error(
                        "Falha de comunicação ou usuário não encontrado."
                    );
                }
            } else {
                console.log("criar usuário");
            }
        }

        getUser();
    }, []);

    async function sendData(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            if (id === "create") {
                await api.post("signup", {
                    fname,
                    lname,
                    email,
                    password: senha,
                });
                toast.success("Usuário criado com sucesso!");
            } else {
                await api.put(`signup/${id}`, {
                    fname,
                    lname,
                    email,
                    password: senha,
                });
                toast.success("Usuário editado com sucesso!");
            }
            router.push("/home");
        } catch (e: any) {
            toast.error(`Falha no envio: ${e}`);
        }
    }

    return (
        <div className=" h-screen sm:h-min border-0 border-white p-4 sm:border-2 m-4">
            {loading ? (
                <div className="my-8 line-center w-full">
                    <ReactLoading
                        type="spinningBubbles"
                        color="white"
                        height={100}
                        width={100}
                    />
                </div>
            ) : (
                <form
                    onSubmit={(e) => sendData(e)}
                    className="line-left gap-4 flex-wrap"
                >
                    <input type="email" className="hidden" />
                    <input type="password" className="hidden" />
                    <div className="w-full sm:w-64 ">
                        <div className="">Primeiro Nome</div>
                        <input
                            className="text-center bg-white rounded-lg w-full h-12 border-2 border-white text-black outline-none focus:outline-white with-transition mt-2"
                            type="text"
                            placeholder="Primeiro nome"
                            value={fname}
                            onChange={(e: any) => setFname(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w-full sm:w-64 ">
                        <div className="">Ultimo Nome</div>
                        <input
                            className="text-center bg-white rounded-lg w-full h-12 border-2 border-white text-black outline-none focus:outline-white with-transition mt-2"
                            type="text"
                            placeholder="Ultimo nome"
                            value={lname}
                            onChange={(e: any) => setLname(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w-full sm:w-64 ">
                        <div className="">E-mail</div>
                        <input
                            className="text-center bg-white rounded-lg w-full h-12 border-2 border-white text-black outline-none focus:outline-white with-transition mt-2"
                            type="text"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
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
                            onChange={(e: any) => setSenha(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>
                    <div className=" line-right w-full ">
                        <button
                            className="cursor-pointer border-2 h-12 rounded-lg mt-8 border-white text-white line-center bg-black font-semibold
                                    w-full sm:w-32  hover:bg-white hover:text-black with-transition"
                            type="submit"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export async function getServerSideProps(context: any) {
    const { id } = context.params;

    return {
        props: {
            id: id,
        },
    };
}
