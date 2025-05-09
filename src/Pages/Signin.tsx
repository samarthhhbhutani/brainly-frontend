import { useEffect, useRef, useState } from "react";
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Brain } from "../Components/Icons/Brain";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  async function checkSignin() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(BACKEND_URL + "/api/v1/checkUser", {
          headers: {
            authorization: token
          }
        });
        if (response.status === 200) {
          navigate("/dashboard");
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  useEffect(() => {
    usernameRef.current?.focus()
    checkSignin();
  }, [])

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    try {
      const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
        username,
        password
      })
      const jwt = response.data.token;
      localStorage.setItem("token", "Bearer " + jwt);
      setError(false);
      navigate("/dashboard");
    } catch (e) {
      setError(true)
      console.log(e)
      if (usernameRef.current && passwordRef.current) {
        usernameRef.current.value = ""
        passwordRef.current.value = ""
      }
    }
  }

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
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <div className="w-full max-w-md">
          <div className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
            <div className="text-center mb-8">
              <Brain className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400">Sign in to your account</p>
            </div>

            <div className="space-y-6">
              <div className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                <Input
                  ref={usernameRef}
                  handeClick={() => { passwordRef.current?.focus() }}
                  placeholder="Username"
                  
                />
              </div>

              <div className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                <Input
                  handeClick={() => { buttonRef.current?.click() }}
                  ref={passwordRef}
                  placeholder="Password"
                  
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">Incorrect Credentials</div>
              )}

              <Button
                refer={buttonRef}
                loading={false}
                variant="primary"
                text="Sign In"
                onClick={signin}
                className="w-full"
              />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-zinc-900/50 text-gray-400">Or</span>
                </div>
              </div>

              <form className="w-full" action={BACKEND_URL + "/auth/google"} method="GET" target="_self">
                <button className="w-full px-4 py-3 rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2" type="submit">
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=" alt="Google" />
                  Sign in with Google
                </button>
              </form>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-purple-500 hover:text-purple-400 font-medium transition-colors"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}