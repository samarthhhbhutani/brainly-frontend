import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function useContent() {
    const navig = useNavigate();
    const [contents, setContents] = useState([]);

    async function Refresh() {
        await axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
            .then((response) => {
                setContents(response.data.content);
            })
            .catch((error) => {
                console.log(error);
                if (error.response?.status === 403) {
                    navig("/signin");
                }
            });
    }

    return { Refresh, contents };
}

export function useMediaContent({ type }: { type: string }) {
    const navig = useNavigate();
    const [contents, setContents] = useState([]);

    async function Refresh() {
        await axios.post(`${BACKEND_URL}/api/v1/content/media`,
            { type: type }, // Data goes here
            {
                headers: {
                    token: localStorage.getItem("token")
                }
            }
        )
            .then((response) => {
                setContents(response.data.content);
            })
            .catch((error) => {
                console.log(error);
                if (error.response?.status === 403) {
                    navig("/signin");
                }
            });
    }
    console.log(contents);
    return { Refresh, contents };
}



export function useShareContent({ shareLink }: { shareLink: string }) {
    const [contents, setContents] = useState([]);
    const [user,setUser]=useState("");
    
    function Refresh() {
        axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`,
        )
            .then((response) => {
                setContents(response.data.content);
                setUser(response.data.user);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    console.log(contents);
    return { Refresh, contents,user };
}