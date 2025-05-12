import { Brain } from "./Icons/Brain";
import { TwitterIcon } from "./Icons/TwitterIcon";
import { YoutubeIcon } from "./Icons/YoutubeIcon";
import { SidebarItem } from "./Sidebaritem";
import { Bar } from "./Icons/Bar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


interface SidebarProps {
  dispBar: boolean;
  setDispBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Sidebar({ dispBar, setDispBar }: SidebarProps) {
  const navigate = useNavigate();
  // const location = useLocation();
  const [windowSize,setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  useEffect(() => {
    const handleResize = () => {
      setWindowSize( [
        window.innerWidth,
        window.innerHeight,
      ]);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(windowSize);
    if(windowSize[0] > 768) {
      setDispBar(true);
    }else{
      setDispBar(false);
    }
  } , [windowSize]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setDispBar(prev => !prev)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-newc shadow-sm hover:bg-gray-50 transition-colors"
        aria-label="Toggle menu"
      >
        <Bar className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-newc/0.45 border-r border-gray-200 w-64 transform transition-transform duration-300 ease-in-out z-40 ${
          dispBar ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-4 md:p-6">
          <button
            onClick={() => {
              navigate("/dashboard");
            }}
            className="flex items-center gap-2 text-2xl md:text-2xl font-semibold text-white hover:text-purple-600 transition-colors"
          >
            <Brain className="w-8 h-8 md:w-8 md:ml-0 ml-12 md:h-8" />
            Brainly
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-2 md:px-4 space-y-1">
          <SidebarItem
            onClick={() => {
              navigate('/dashboard/twitter');
              setDispBar(false);
            }}
            text="Twitter"
            icon={<TwitterIcon className="w-5 h-5" />}
          />
          <SidebarItem
            onClick={() => {
              navigate('/dashboard/youtube');
              setDispBar(false);
            }}
            text="Youtube"
            icon={<YoutubeIcon className="w-5 h-5" />}
          />
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-sm font-medium text-purple-600">U</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-50">User</p>
              <p className="text-xs text-gray-500">Free Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {dispBar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setDispBar(false)}
        />
      )}
    </>
  );
}