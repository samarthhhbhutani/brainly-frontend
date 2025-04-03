// export function Brain({large}:{
//     large?:string
// }){
//     let size=36;
//     if(large=="md"){
//         size=160
//     }else if(large=="sm"){
//         size=96
//     }
//     return(
//         <svg  xmlns="http://www.w3.org/2000/svg"  width={`${size}`}  height={`${size}`}  viewBox="0 0 24 24"  fill="#7164c0"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brain"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" /><path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" /><path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" /><path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" /><path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" /><path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" /></svg>
//     )
// }


export function Brain({large}:{ large?:string }){
    let size=36;
    if(large==="md"){
        size=160;
    }else if(large==="sm"){
        size=96;
    }
    return(
        <img
            src="src\Components\Icons\newBrain.svg"
            width={`${size}`}
            height={`${size}`}
            alt="Brain Icon"
            className="icon icon-tabler icon-tabler-brain"
        />
    );
}
