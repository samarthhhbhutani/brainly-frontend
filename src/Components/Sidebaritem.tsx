import { ReactElement } from "react";

export function SidebarItem({text,icon,onCl}:{
    text:string,icon:ReactElement,onCl:()=>void
}){
    return <div onClick={onCl} className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 transition-all duration-250">
        <div className="p-2">
        {icon}
        </div>
        <div className="p-2">
        {text} 
        </div>
    </div>
}