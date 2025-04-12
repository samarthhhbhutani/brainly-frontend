import { useEffect, useRef, useState } from "react";
import { Button } from "../Components/button";
import { Input } from "../Components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Brain } from "../Components/Icons/Brain";


export function Signin(){
    const usernameRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [error,setError]=useState(false);
    const navigate=useNavigate();

    async function checkSignin(){
        const token=localStorage.getItem("token");
        if(token){
            try{
                const response=await axios.get(BACKEND_URL+"/api/v1/checkUser",{
                    headers:{
                        authorization:token
                    }
                });
                if(response.status===200){
                    navigate("/dashboard");
                }
            }catch(e){
                console.log(e);
            }
        }
    }

    useEffect(()=>{
        usernameRef.current?.focus()
        checkSignin();
    },[])
    

    async function signin(){
        const username=usernameRef.current?.value;
        const password=passwordRef.current?.value;
        try{    
            const response=await axios.post(BACKEND_URL+"/api/v1/signin",{
                username,
                password
            })
            const jwt=response.data.token;
            localStorage.setItem("token","Bearer "+jwt);
            setError(false);
            navigate("/dashboard");
        }catch(e){
            setError(true)
            if(usernameRef.current && passwordRef.current){
                usernameRef.current.value=""
                passwordRef.current.value=""
            }
            
        }
        //Redirect user to Dashboard
    }

    return(
   
    <div className="bg-zinc-900 h-screen w-screen">
        <div className="absolute ml-8 md:ml-16">
            <div onClick={()=>{navigate('/')}} className={`flex items-center text-3xl gap-1 md:pt-6 pt-6 text-white font-bold cursor-pointer`}>
                        <Brain/>
                        Brainly
            </div>
        </div>
        <div className="flex justify-center items-center w-full h-full">
            <div>
            <div className="flex flex-col items-center min-w-60">
            <Brain large="sm"/>
            <span className="text-white text-2xl font-bold mt-4">Sign in to your account </span>
            </div>
            <div className="min-w-72 placeholder-white mt-4">
                <Input ref={usernameRef} handeClick={()=>{passwordRef.current?.focus()}} placeholder="Username"></Input>
                <Input handeClick={()=>{
                    buttonRef.current?.click()
                }} ref={passwordRef} placeholder="Password"></Input>
                <div className="flex justify-center py-4 w-full">
                    <Button refer={buttonRef} loading={false} variant="primary" text="Sign in" onClick={signin} fullWidth={true}></Button>
                </div>
                {error && <div className="text-red-500 text-center mb-2 text-lg">Incorrect Credentials</div>}
                <h2 className="flex justify-center text-sm grow-1 shrink-0 basis-auto w-full mx-auto text-white">Don't have an account? <span className="ml-1 cursor-pointer underline font-bold hover:opacity-80 text-purple-600" onClick={()=>{navigate("/signup")}}>Sign up</span></h2>
                <div className="flex justify-center py-4 w-full">
                    <form action={BACKEND_URL+"/auth/google"} method="GET" target="_self">
                    <Button refer={buttonRef} loading={false} variant="primary" text="Sign in with Google" type={"submit"} fullWidth={true}></Button>
                    </form>
                </div>

                </div>
            </div>
        </div>
    </div>
    )
}