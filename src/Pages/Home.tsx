import { useNavigate } from "react-router-dom";
import { Button } from "../Components/Button";
import { Brain } from "../Components/Icons/Brain";
import { TwitterIcon } from "../Components/Icons/TwitterIcon";
import { YoutubeIcon } from "../Components/Icons/YoutubeIcon";
import { ShareIcon } from "../Components/Icons/ShareIcon";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
              <Brain className="w-8 h-8" />
              <span className="text-2xl font-bold text-white">Brainly</span>
            </div>
            <div className="flex items-center gap-4">
              <Button large={true} onClick={() => navigate("/signin")} variant="primary" text="Sign in" />
              <Button large={true} onClick={() => navigate("/signup")} variant="secondary" text="Sign up" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Your Digital Brain,<br />
              <span className="text-purple-500">Organized</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-delay">
              Store, organize, and share your favorite content from across the web. 
              Everything in one place, beautifully organized.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delay-2">
              <Button 
                large={true} 
                onClick={() => navigate("/signup")} 
                variant="primary" 
                text="Get Started Free"
                className="w-full sm:w-auto"
              />
              <Button 
                large={true} 
                onClick={() => navigate("/signin")} 
                variant="secondary" 
                text="Learn More"
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-16">Why Choose Brainly?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-zinc-900/50 p-6 rounded-xl backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <TwitterIcon className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Social Media Integration</h3>
              <p className="text-gray-400">Save and organize content from Twitter, YouTube, and more. Everything in one place.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-zinc-900/50 p-6 rounded-xl backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <YoutubeIcon className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Smart Organization</h3>
              <p className="text-gray-400">Automatically categorize and tag your content for easy access when you need it.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-zinc-900/50 p-6 rounded-xl backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 text-purple-500">
                <ShareIcon  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Easy Sharing</h3>
              <p className="text-gray-400">Share your curated collections with friends, colleagues, or the world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-500">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Sign Up</h3>
              <p className="text-gray-400">Create your free account in seconds</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-500">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Add Content</h3>
              <p className="text-gray-400">Save your favorite content from the web</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-500">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Organize</h3>
              <p className="text-gray-400">Categorize and tag your content</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-500">4</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Share</h3>
              <p className="text-gray-400">Share your collections with others</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">&copy; 2024 Brainly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
