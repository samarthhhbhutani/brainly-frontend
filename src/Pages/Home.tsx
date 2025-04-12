import { useNavigate } from "react-router-dom";
import { Button } from "../Components/button";
import { Brain } from "../Components/Icons/Brain";

export function Home(){
    let navigate=useNavigate();
    return(
        <div className="min-h-screen bg-zinc-900">
            <div className="flex ml-8 md:ml-16 items-end justify-between">
                <div onClick={()=>{navigate('/')}} className={`flex items-center text-3xl gap-1 md:pt-6 pt-6 text-white font-bold cursor-pointer`}>
                    <Brain/>
                    Brainly
                </div>
                <div className="flex gap-2 mr-4">
                <Button large={true} onClick={()=>{navigate("/signin")}} variant="primary" text="Sign in"/>
                <Button large={true} onClick={()=>{navigate("/signup")}} variant="secondary" text="Sign up"/>
                </div>
            </div>
            <div className="ml-8 md:ml-16">
            <div className="mt-30">
                <h2 className="text-6xl text-white font-bold mt-4">Keep Important Links</h2>
                <h2 className="text-6xl mt-2 text-white  font-bold">in your brain.</h2>
            </div>
            <div className="text-gray-600 text-3xl mt-8">
                <h2>Store and organize important</h2>
                <h2>Youtube vidoes, tweets, documents</h2>
                <h2>and more, all in one place.</h2>
            </div>
            <div className="mt-8 flex gap-4 items-center font-bold">
                <Button onClick={()=>{navigate('/signup')}} large={true} variant="primary" text="Get Started with Brainly"/>
                <a href="#howWorks" className="text-purple-600 text-lg cursor-pointer hover:opacity-80">How it Works?</a>
            </div>
            <div className="mt-16 mr-2">
            <img src="src/Images/cover.png"></img>
            </div>
            <div className="mt-12 pb-20 grid grid-cols-12">
            <div className="text-white ml-8 mr-16 mt-8 col-span-12 md:col-span-6">
                <div className="">
                    <h2 className="font-bold text-lg mb-2">Keep important links in your Brain</h2>
                    <h4>Store and organize Youtube vidoes, tweets, documents and more, all in one place. Everything effortlessly managed
                    </h4>
                </div>
                <hr className="mt-6 opacity-20 mb-4 text-gray-600"></hr>
                <div className="">
                    <h2 className="font-bold text-lg mb-2">All your links together</h2>
                    <h4>Where it's interesting Youtube videos, tweets you like, or documents you need, easily save them to your Brain for easy access later.
                    </h4>
                </div>
                <hr className="mt-6 opacity-20 mb-4 text-gray-600"></hr>
                
                <div className="">
                    <h2 className="font-bold text-lg mb-2">Focus on what you need</h2>
                    <h4>Only want to see tweets or just Youtube videos? You can filter your links by their type so you can concentrate on what's relevant
                    </h4>
                </div>

                <hr className="mt-6 opacity-20 mb-4 text-gray-600"></hr>
                
                <div className="">
                    <h2 className="font-bold text-lg mb-2">Foster collaboration</h2>
                    <h4>Share your curated collection with friends, colleagues, or the world. Control visibility and access with just a few clicks.
                    </h4>
                </div>
            </div>

            <div className="flex flex-col items-center mt-20 md:mt-12 col-span-12 md:col-span-6 md:mr-8 justify-center md:ml-4">
                <div className="hover:scale-110 duration-150 ease-in-out cursor-pointer">
                    <Brain large="md"/>
                </div>
                <h2 className="text-white font-bold text-4xl">Brainly</h2>
                <h2 className="text-xl mt-6 text-white">Free without limits</h2>
                <h2 onClick={()=>{navigate("/signup")}} className="text-purple-600 text-xl mt-2 hover:opacity-80 cursor-pointer font-bold">Sign Up Now</h2>
            </div>
            </div>

            <div id="howWorks" className="text-white pb-30 pt-20 grid grid-cols-12 gap-8 mr-8 md:mr-16 md:gap-16">
            {["1", "2", "3", "4"].map((number, index) => (
                <div 
                    key={number} 
                    className={`flex flex-col col-span-12 items-center text-center md:col-span-3 ${index >= 1 ? 'mt-12 md:mt-0' : ''}`}>
                    <div className="bg-purple-600  rounded-full flex justify-center items-center font-bold text-3xl w-12 h-12">
                        {number}
                    </div>
                    <div className="text-3xl font-bold md:text-3xl mt-8">
                        {number === "1" ? "Create Your Space" : number === "2" ? "Add Your Links" : number === "3" ? "Organize Smartly" : "Share Your Brain"}
                    </div>
                    <div className="flex justify-center mt-4 text-lg flex-wrap text-gray-300">
                        {number === "1" 
                            ? "Sign up and start building your personalized link hub" 
                            : number === "2" 
                            ? "Add content from YouTube, Twitter, documents, and more" 
                            : number === "3" 
                            ? "Use categories and tags to keep things tidy." 
                            : "Allow friends and collaborators to view your curated collection"}
                    </div>
                </div>
            ))}
        </div>

            




            <div className="pb-6">
                <div className={`flex items-center text-3xl gap-1 md:pt-10 pt-6 text-white font-bold`}>
                        <Brain/>
                        Brainly
                </div>
                <div className="text-gray-300 text-lg mt-4 mb-2">Follow us</div>
                <div className="flex">
                <div className="text-white flex flex-col gap-1">
                    
                        <span className="hover:text-purple-500 duration-150 cursor-pointer mr-4">Discord</span>
                        
                    
                        <span className="hover:text-purple-500 duration-150 cursor-pointer mr-4">Bluesky</span>
                       
                        <span className="hover:text-purple-500 duration-150 cursor-pointer mr-4">Mastodon</span>
                        
                    
                        <span className="hover:text-purple-500 duration-150 cursor-pointer mr-4">Github</span>
                </div>
                <div className="text-white flex flex-col gap-1">
                <span className="hover:text-purple-500 duration-150 cursor-pointer mr-4">Twitter</span>
                <span className="hover:text-purple-500 duration-150 cursor-pointer mr-4">Threads</span>
                <span className="hover:text-purple-500 duration-150 cursor-pointer mr-4">Youtube</span>
                </div>
                </div>
            </div>
            <div className="pb-6">
                <h2 className="text-white">&copy; 2025 Brainly</h2>
            </div>
            </div>       
        </div>
    )
}