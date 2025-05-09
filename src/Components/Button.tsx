import { ReactElement } from "react";


interface ButtonProps{
    text:string,
    variant:"primary" | "secondary",
    startIcon?:ReactElement,
    onClick?:()=>void,
    fullWidth?:boolean,
    loading?:boolean,
    large?:boolean,
    refer?:any,
    type?:"button" | "submit" | "reset",
    className?: string
};

const variantStyles={
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-200 text-purple-600"
}

const defaultStyles="px-4 py-2 rounded-md font-semibold flex items-center justify-center"

export function Button({large,variant,fullWidth,text,startIcon,onClick,loading,refer,type,className}:ButtonProps){
    return <button type={type} ref={refer} onClick={onClick} className={`${variantStyles[variant]} ${large?"text-lg font-bold":""}  cursor-pointer ${defaultStyles} ${fullWidth ? "w-full":""} ${
        loading? "disabled opacity-45": "hover:opacity-80"} ${className || ''}`}><div className="pr-2">{startIcon}</div>{text}</button>
}