import { useEffect, useState } from "react";
import { Button } from "./Button";
import { CrossIcon } from "./Icons/CrossIcon";
import { BACKEND_URL } from "../config";
import axios from 'axios';

// Controlled Component
export function CreateShareModal({ open, onClose }:{open:boolean, onClose:()=>void}) {
    const [link, setLink] = useState("");
    const [share, setShare] = useState(false);
    const [loading, setLoading] = useState(false);
    const [copySuccess, setCopySuccess] = useState("");
    console.log(loading);
    async function backendHit() {
        try {
            const resp = await axios.get(`${BACKEND_URL}/api/v1/brain/checkShare`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            return resp;
        } catch (error) {
            console.error("Error in backendHit:", error);
            return null;
        }
    }

    useEffect(() => {
        async function fetchShareStatus() {
            const resp = await backendHit();
            if (resp && resp.data.link) {
                setShare(true);
                setLink(resp.data.link);
            } else {
                setShare(false);
                setLink("");
            }
        }
        fetchShareStatus();
    }, []);

    async function createShareLink() {
        setLoading(true);
        try {
            const resp = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {}, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            setLoading(false);
            return resp;
        } catch (error) {
            setLoading(false);
            console.error("Error creating share link:", error);
        }
    }

    async function deleteShareLink() {
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/brain/share`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
        } catch (error) {
            console.error("Error deleting share link:", error);
        }
    }

    useEffect(() => {
        async function updateShareLink() {
            if (share) {
                const resp = await createShareLink();
                if (resp && resp.data.link) {
                    setLink(resp.data.link);
                }
            } else {
                await deleteShareLink();
                setLink("");
            }
        }
        updateShareLink();
    }, [share]);

    const handleCopy = () => {
        navigator.clipboard.writeText("https://brainly-xi.vercel.app/share/"+link);
        setCopySuccess("Link copied!");
        console.log("DONE");
        setTimeout(() => setCopySuccess(""), 2000);
    };

    return (
        <div>
            {open && (
                <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
                    <div className="bg-white p-3 rounded-md shadow-lg">
                        <div onClick={onClose} className="flex justify-end cursor-pointer">
                            <CrossIcon />
                        </div>
                        <div>
                            <label className="relative flex justify-between items-center group p-2 text-xl">
                                Share?
                                <input onChange={() => setShare(!share)} defaultChecked={share} type="checkbox" className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md" />
                                <span className="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-purple-600 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
                            </label>
                        </div>
                        <div className="flex">
                        <span className="border bg-zinc-900/85 px-2 rounded-md flex flex-nowrap items-center w-48 mr-2 whitespace-nowrap overflow-x-auto no-scrollbar">{share ? "https://brainly-xi.vercel.app/share/"+link: "No Link"}</span>
                        <Button text="Copy link" variant="primary" loading={share ? false : true} onClick={() => handleCopy()} large={false}></Button>
                    </div>            
                        {copySuccess && <p className="text-green-500 mt-2">{copySuccess}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}