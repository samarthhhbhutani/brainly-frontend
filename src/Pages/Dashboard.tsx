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
import { TwitterIcon } from '../Components/Icons/TwitterIcon'
import { YoutubeIcon } from '../Components/Icons/YoutubeIcon'

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const { contents, Refresh } = useContent();
  const [dispBar, setDispBar] = useState(false);
  const [ref, setRef] = useState(false);
  const refer = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", "Bearer " + token);
      navigate("/dashboard", { replace: true });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await Refresh();
    };

    fetchData();

    if (refer.current) {
      clearInterval(refer.current);
    }
    
    const clock = setInterval(() => {
      Refresh();
    }, 1000 * 20);
    
    refer.current = clock;
    
    return () => {
      if (refer.current) {
        clearInterval(refer.current);
      }
    };
  }, [ref]);

  const twitterCount = contents.filter((c: any) => c.type === 'twitter').length;
  const youtubeCount = contents.filter((c: any) => c.type === 'youtube').length;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar dispBar={dispBar} setDispBar={setDispBar} />
      
      <main className={`flex-1 transition-all duration-300 md:ml-64 ml-12 p-4 md:p-6`}>
        <div className={`${modalOpen || shareOpen ? 'opacity-60' : ''}`}>
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="heading-2 text-blackish">My Content</h1>
              <p className="text-body mt-2">Manage and organize your content</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <Button
                onClick={() => setModalOpen(true)}
                variant="primary"
                text="Add content"
                startIcon={<Plus />}
                className="hover-lift"
              />
              <Button
                startIcon={<ShareIcon />}
                onClick={() => setShareOpen(true)}
                variant="secondary"
                text="Share brain"
                className="hover-lift"
              />
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
                className="btn-icon hover:bg-gray-200 transition-colors"
                aria-label="Logout"
              >
                <Logout />
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="card p-6">
              <div className="flex-between">
                <div>
                  <p className="text-small text-gray-600">Total Content</p>
                  <h3 className="heading-3 mt-1">{contents.length}</h3>
                </div>
                <div className="p-3 rounded-full bg-purple-100">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex-between">
                <div>
                  <p className="text-small text-gray-600">Twitter Posts</p>
                  <h3 className="heading-3 mt-1">{twitterCount}</h3>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <TwitterIcon className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex-between">
                <div>
                  <p className="text-small text-gray-600">YouTube Videos</p>
                  <h3 className="heading-3 mt-1">{youtubeCount}</h3>
                </div>
                <div className="p-3 rounded-full bg-red-100">
                  <YoutubeIcon className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {contents.map(({ type, link, title, _id }) => (
              <div key={_id} className="fade-in">
                <Card
                  setRef={setRef}
                  id={_id}
                  type={type}
                  link={link}
                  title={title}
                />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {contents.length === 0 && (
            <div className="flex-center flex-col py-16">
              <div className="p-4 rounded-full bg-purple-100 mb-4">
                <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="heading-3 text-gray-900">No content yet</h2>
              <p className="text-body text-center mt-2 max-w-md">
                Start by adding your first content. You can add Twitter posts, YouTube videos, and more.
              </p>
              <Button
                onClick={() => setModalOpen(true)}
                variant="primary"
                text="Add your first content"
                startIcon={<Plus />}
                className="mt-6 hover-lift"
              />
            </div>
          )}
        </div>

        {/* Modals */}
        <CreateShareModal
          open={shareOpen}
          onClose={() => setShareOpen(false)}
        />
        <CreateContentModal
          setRef={setRef}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </main>
    </div>
  );
}

export default Dashboard;
