import { useEffect, useRef, useState } from 'react'


import { Card } from '../Components/Card'
import { Sidebar } from '../Components/Sidebar'
import { useShareContent } from '../Hooks/useContent'
import { useParams } from 'react-router-dom'



export function ShareDashboard() {
    useEffect(()=>{
        console.log("Re-render")
        Refresh();
        if (refer.current) {
          clearInterval(refer.current); 
      }    const clock=setInterval(()=>{
          Refresh()
        },1000*100);
        refer.current=clock;
        if(refer.current){
          return()=>{clearInterval(refer.current)}
        }
    },[])
  
  
  const [dispBar,setDispBar]=useState(false);
  const refer = useRef<ReturnType<typeof setInterval> | null>(null);
  const {shareId}= useParams();
  const {user,contents,Refresh}=useShareContent({shareLink:shareId as string});
  
  console.log(user);

  return (
    <>
    <div className={``}>
    <Sidebar dispBar={dispBar} setDispBar={setDispBar}/>
    </div>
    <div className={`p-4  md:ml-64 min-h-screen bg-blackish ${dispBar?"ml-48":""}`}>
      <div className='text-white text-lg md:text-2xl md:px-0 px-8 font-bold'>
        You are viewing the shared content of {user}
      </div>
      <div className={`flex mt-8 gap-4 flex-wrap` }>
        {contents.map(({type,link,title})=>
        <Card type={type} link={link} title={title}/>)}
      </div>
      </div>
    </>
  )
}

export default ShareDashboard
