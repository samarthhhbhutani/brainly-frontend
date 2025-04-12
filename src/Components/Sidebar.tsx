import { Brain } from "./Icons/Brain";
import { TwitterIcon } from "./Icons/TwitterIcon";
import { Youtubeicon } from "./Icons/YoutubeIcon";
import { SidebarItem } from "./Sidebaritem";
import { Bar } from "./Icons/Bar";
import { useNavigate } from "react-router-dom";

export function Sidebar({dispBar,setDispBar}:any){
   const navigate=useNavigate();
    return(
        <div>
            <div 
            onClick={() => {
                setDispBar((prev:any) => {
                    console.log(!prev); // Logs the updated value
                    return !prev;
                });
            }} 
            className={`${dispBar ? "bg-muted-pastel" : "bg-muted-pastel"} md:hidden z-10 absolute cursor-pointer ml-2 mt-2`}
        >
            <Bar />
        </div>
        <div className={`h-screen bg-muted-pastel border-r w-48 md:w-64 ${dispBar? "absolute":"hidden"} md:absolute md:block left-0 top-0`}>
        
        <div onClick={()=>{navigate("/dashboard")}} className={`flex items-center cursor-pointer text-2xl gap-1 ml-2 md:pt-4 ${dispBar?"pt-10":"pt-4"}`}>
            <Brain/>
            Brainly
        </div>
        <div className="pt-4 pl-4">
        <SidebarItem onCl={()=>{navigate('/dashboard/twitter')}} text="Twitter" icon={<TwitterIcon/>}></SidebarItem>
        <SidebarItem onCl={()=>{navigate('/dashboard/youtube')}} text="Youtube" icon={<Youtubeicon/>}></SidebarItem>
        </div>
    </div>
    </div>
    )
}