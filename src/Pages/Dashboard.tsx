import { useEffect, useRef, useState } from 'react'
import { Button } from '../Components/Button'
import { Plus } from '../Components/Icons/Plus'
import { Card } from '../Components/Card'
import { CreateContentModal } from '../Components/CreateContentModal'
import { Sidebar } from '../Components/Sidebar'
import { useContent } from '../Hooks/useContent'
import { ShareIcon } from '../Components/Icons/ShareIcon'
import { CreateShareModal } from '../Components/ShareModal'
import { Logout } from '../Components/Icons/Logout'
import { useNavigate } from 'react-router-dom'


export function Dashboard() {
  const [modalOpen,setModalOpen]=useState(false);
  const [shareOpen,setShareOpen]=useState(false);
  const {contents,Refresh}=useContent();
  const [dispBar,setDispBar]=useState(false);
  const [ref,setRef]=useState(false);
  console.log("Modal Open:", modalOpen, "Share Open:", shareOpen);
  const refer = useRef<ReturnType<typeof setInterval> | null>(null);

  const navigate=useNavigate();
  console.log("Re-render");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Save the token for future API calls
      localStorage.setItem("token","Bearer "+token);

      // Optionally clean up the URL
      navigate("/dashboard", { replace: true });
    }
  }, []);


  useEffect(()=>{
    console.log("Re-render inside")

    const fetchData = async () => {
      await Refresh();
    };
  
    fetchData();

    if (refer.current) {
      clearInterval(refer.current); 
  }    const clock=setInterval(()=>{
      Refresh()
    },1000*20);
    refer.current=clock;
    if(refer.current){
      return()=>{
        if(refer.current){
          clearInterval(refer.current)
        }
      }
    }
      
  },[ref])

  return (
    <>
    <div className={``}>
    <Sidebar dispBar={dispBar} setDispBar={setDispBar}/>
    </div>
    <div className={`p-4 md:ml-64 min-h-screen bg-blackish ${dispBar?"ml-48":""}`}>
      <div className={`flex justify-end items-center gap-4 ${modalOpen || shareOpen ? 'opacity-60' :""}`}>
        <Button onClick={()=>{setModalOpen(true)}} variant='primary' text="Add content" startIcon={<Plus/>}></Button>
        <Button startIcon={<ShareIcon/>} onClick={()=>{setShareOpen(true)}} variant='secondary' text="Share brain"></Button>
        <div className='cursor-pointer hover:opacity-80' onClick={()=>{
          localStorage.removeItem("token");
          navigate("/");
        }}>
        <Logout/>
        </div>
      </div>

      <div className={`flex mt-8 gap-4 flex-wrap ${modalOpen || shareOpen ? 'opacity-60' :""}`}>
        {contents.map(({type,link,title,_id})=>
        <Card setRef={setRef} id={_id} type={type} link={link} title={title}/>)}
      </div>
      <CreateShareModal open={shareOpen} onClose={()=>{
        setShareOpen(false)
      }}></CreateShareModal>
      <CreateContentModal setRef={setRef} open={modalOpen} onClose={()=>setModalOpen(false)} ></CreateContentModal>
      </div>
    </>
  )
}

export default Dashboard
