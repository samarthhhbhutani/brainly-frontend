import { useEffect, useRef, useState } from 'react'

import { Button } from '../Components/Button'
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
      return()=>{
        if(refer.current)clearInterval(refer.current)}
    }
      
  },[])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar dispBar={dispBar} setDispBar={setDispBar}/>
      <main className={`flex-1 transition-all duration-300 md:ml-64 p-4 md:p-6 ml-12`}>
        <div className={`${modalOpen || shareOpen ? 'opacity-60' : ''}`}>
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="heading-2 text-blackish">Twitter Content</h1>
              <p className="text-body mt-2">Manage your Twitter posts</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <Button onClick={()=>{setModalOpen(true)}} variant='primary' text="Add content" startIcon={<Plus/>}></Button>
              <Button startIcon={<ShareIcon/>} onClick={()=>{setShareOpen(true)}} variant='secondary' text="Share brain"></Button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {contents.map(({type,link,title, _id})=>
              <div key={_id} className="fade-in">
                <Card type={type} link={link} title={title}/>
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        <CreateShareModal open={shareOpen} onClose={()=>{
          setShareOpen(false)
        }}></CreateShareModal>
        <CreateContentModal open={modalOpen} onClose={()=>setModalOpen(false)} ></CreateContentModal>
      </main>
    </div>
  )
}

export default TwitterDashboard
