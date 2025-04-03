export function Input({ref,placeholder,handeClick, onCh} : {ref?:any,placeholder:string,handeClick?:any,onCh?:any}){
    document.addEventListener('keydown', (event: KeyboardEvent) => {
        if (handeClick && event.key === 'Enter') {
            handeClick()
        }
    });
    
    return <div>
        <input onChange={onCh} ref={ref} type={"text"} className="px-4 py-2 my-2  rounded bg-muted-pastel border-1 border-neutral-700 focus:border-neutral-500 duration-150 hover:border-neutral-600 placeholder-gray-500 text-gray-500 w-full" placeholder={placeholder}></input>
    </div>
}