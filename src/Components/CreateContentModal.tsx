import { useRef, useState } from "react";
import { Button } from "./Button";
import { CrossIcon } from "./Icons/CrossIcon";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from 'axios'
import { useContent } from "../Hooks/useContent";
enum ContentType{
    Youtube="youtube",
    Twitter="twitter"
}

//Controlled Component
export function CreateContentModal({open,onClose,setRef}:{open:any,onClose:any,setRef?:any}){
    const [type,setType]=useState(ContentType.Youtube);
    const titleRef=useRef<HTMLInputElement>(null);
    const linkRef=useRef<HTMLInputElement>(null);
    const {Refresh}=useContent();

    async function createContent(){
        if(titleRef==null || linkRef==null){
            console.log("Ref is null")
            return;
        }
        if(titleRef.current==null || linkRef.current==null){
            console.log("Ref is null")
            return;
        }
        const title=titleRef.current.value;
        const link=linkRef.current.value;
        
        await axios.post(BACKEND_URL+"/api/v1/content",{
            link,title,type
        },{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        });
        setRef((c: boolean) => !c);
        onClose();
        console.log("FROM CONTENT MODEL");
        Refresh();
    }

    return(
        <div>
        {open && <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
            <div className="flex flex-col justify-center">
                <span className="bg-muted-pastel opacity-100 p-4 rounded ">
                    <div onClick={onClose} className="flex justify-end cursor-pointer mb-2">
                        <CrossIcon/>
                    </div>
                    <div>
                        <Input ref={titleRef} placeholder="Title" ></Input>
                        <Input ref={linkRef} placeholder="Link"></Input>
                    </div>
                    <div className="flex justify-around mb-6  mt-4">
                        <Button text="Youtube" variant={type===ContentType.Youtube ? "primary" : "secondary"} onClick={()=>{
                            setType(ContentType.Youtube)
                        }}></Button>
                        <Button text="Twitter" variant={type===ContentType.Twitter ? "primary" : "secondary"} onClick={()=>{
                            setType(ContentType.Twitter)
                        }}></Button>
                        
                    </div>
                    <div className="flex justify-center">
                        <Button onClick={()=>{createContent()}} variant="primary" text="Add Content"></Button>
                    </div>
                    
                </span>
            </div>
        </div>}
        </div>
    )
}
