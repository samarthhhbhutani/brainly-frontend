import { useRef, useState } from "react";
import { Button } from "../Components/button";
import { Input } from "../Components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Brain } from "../Components/Icons/Brain";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const [error,setError]=useState("");
    const [usernameError, setUsernameError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    function validateUsername(username: string) {
        if (username.length < 3 || username.length > 10) {
            setUsernameError("Username must be between 3 and 10 characters.");
            console.log("USERNAME ERROR")
        } else {
            setUsernameError("");
            console.log("USERNAME")
        }
    }

    function validatePassword(password: string) {
        if (password.length < 8 || password.length > 20) {
            setPasswordError("Password must be between 8 and 20 characters.");
            console.log("ERROR")
        } else {
            setPasswordError("");
        }
    }

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        try{
            if (!usernameError && !passwordError) {
                const resp=await axios.post(BACKEND_URL + "/api/v1/signup", { username, password });
                localStorage.setItem("token", resp.data.token);
                navigate("/dashboard");
            }
            setError("");
        }catch(e){
            console.log(e);
            if(e.status==411){
                setError("Invalid input format")
            }else{
                setError("Username is already taken")
            }
        }   
        
    }

    return (
        <div className="bg-zinc-900 h-screen w-screen">
            <div className="absolute ml-8 md:ml-16">
                <div onClick={() => { navigate('/') }} className={`flex items-center text-3xl gap-1 md:pt-6 pt-6 text-white font-bold cursor-pointer`}>
                    <Brain />
                    Brainly
                </div>
            </div>
            <div className="flex justify-center h-full w-full items-center">
                <div>
                    <div className="flex flex-col items-center min-w-60">
                        <Brain large="sm" />
                        <span className="text-white text-2xl font-bold mt-4">Create an account</span>
                    </div>
                    <div className="w-72 placeholder-white mt-4">
                        <Input ref={usernameRef} handeClick={()=>{if(usernameError==""){passwordRef.current?.focus();{console.log(!usernameError)}}}} onCh={(e) => validateUsername(e.target.value)} placeholder="Username" />
                        {usernameError && <span className="text-red-500 ">{usernameError}</span>}
                        <Input handeClick={()=>{if(!usernameError && !passwordError){buttonRef.current?.click()}}} ref={passwordRef} onCh={(e) => validatePassword(e.target.value)} placeholder="Password" />
                        {passwordError && <span className="text-red-500">{passwordError}</span>}
                        <div className="flex justify-center py-4 w-full">
                            <Button loading={!usernameError && !passwordError ? false : true} refer={buttonRef} variant="primary" text="Sign up" onClick={signup} fullWidth={true}></Button>
                        </div>
                        {error && <div className="text-red-500 text-center mb-2 text-lg">{error}</div>}
                        <h2 className="flex justify-center text-sm grow-1 shrink-0 basis-auto w-full mx-auto text-white hover:opacity-80">
                            Already have an account? <span className="ml-1 cursor-pointer underline font-bold text-purple-600" onClick={() => { navigate("/signin") }}>Sign in</span>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
