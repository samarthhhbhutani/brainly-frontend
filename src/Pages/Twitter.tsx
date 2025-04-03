import { useEffect, useRef, useState } from 'react'

import { Button } from '../Components/button'
import { Plus } from '../Components/Icons/Plus'
import { Card } from '../Components/Card'
import { CreateContentModal } from '../Components/CreateContentModal'
import { Sidebar } from '../Components/Sidebar'
import { useMediaContent } from '../Hooks/useContent'
import { ShareIcon } from '../Components/Icons/ShareIcon'
import { CreateShareModal } from '../Components/ShareModal'


export function TwitterDashboard() {
  const [modalOpen,setModalOpen]=useState(false);
  const [shareOpen,setShareOpen]=useState(false);
  const {contents,Refresh}=useMediaContent({type:"twitter"});
  const [dispBar,setDispBar]=useState(false);

  const refer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(()=>{
    Refresh();
    if (refer.current) {
      clearInterval(refer.current); 
  }    const clock=setInterval(()=>{
      Refresh()
    },1000*10);
    refer.current=clock;
    if(refer.current){
      return()=>{clearInterval(refer.current)}
    }
      
  },[])

  return (
    <>
    <div className={``}>
    <Sidebar dispBar={dispBar} setDispBar={setDispBar}/>
    </div>
    <div className={`p-4 md:ml-64 min-h-screen bg-blackish ${dispBar?"ml-48":""}`}>
      <div className={`flex justify-end gap-4 ${modalOpen || shareOpen ? 'opacity-60' :""}`}>
        <Button onClick={()=>{setModalOpen(true)}} variant='primary' text="Add content" startIcon={<Plus/>}></Button>
        <Button startIcon={<ShareIcon/>} onClick={()=>{setShareOpen(true)}} variant='secondary' text="Share brain"></Button>
      </div>

      <div className={`flex mt-8 gap-4 flex-wrap ${modalOpen || shareOpen ? 'opacity-60' :""}`}>
        {contents.map(({type,link,title})=>
        <Card type={type} link={link} title={title}/>)}
      </div>
      <CreateShareModal open={shareOpen} onClose={()=>{
        setShareOpen(false)
      }}></CreateShareModal>
      <CreateContentModal open={modalOpen} onClose={()=>setModalOpen(false)} ></CreateContentModal>
      </div>
    </>
  )
}

export default TwitterDashboard
