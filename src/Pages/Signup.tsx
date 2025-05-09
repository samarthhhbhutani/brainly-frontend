import { useRef, useState } from "react";
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Brain } from "../Components/Icons/Brain";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  function validateUsername(username: string) {
    if (username.length < 3 || username.length > 10) {
      setUsernameError("Username must be between 3 and 10 characters.");
      console.log("USERNAME ERROR");
    } else {
      setUsernameError("");
      console.log("USERNAME");
    }
  }

  function validatePassword(password: string) {
    if (password.length < 8 || password.length > 20) {
      setPasswordError("Password must be between 8 and 20 characters.");
      console.log("ERROR");
    } else {
      setPasswordError("");
    }
  }

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    try {
      if (!usernameError && !passwordError) {
        const resp = await axios.post(BACKEND_URL + "/api/v1/signup", { username, password });
        localStorage.setItem("token", resp.data.token);
        navigate("/dashboard");
      }
      setError("");
    } catch (e: any) {
      console.log(e);
      if (e.status == 411) {
        setError("Invalid input format");
      } else {
        setError("Username is already taken");
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
              <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-gray-400">Join Brainly and start organizing your content</p>
            </div>

            <div className="space-y-6">
              <div>
                <Input
                  ref={usernameRef}
                  handeClick={() => { if (usernameError == "") { passwordRef.current?.focus(); { console.log(!usernameError) } } }}
                  onCh={(e: React.ChangeEvent<HTMLInputElement>) => validateUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                {usernameError && <span className="text-red-500 text-sm mt-1 block">{usernameError}</span>}
              </div>

              <div>
                <Input
                  handeClick={() => { if (!usernameError && !passwordError) { buttonRef.current?.click() } }}
                  ref={passwordRef}
                  onCh={(e: React.ChangeEvent<HTMLInputElement>) => validatePassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                {passwordError && <span className="text-red-500 text-sm mt-1 block">{passwordError}</span>}
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <Button
                loading={!usernameError && !passwordError ? false : true}
                refer={buttonRef}
                variant="primary"
                text="Sign up"
                onClick={signup}
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
                  Sign up with Google
                </button>
              </form>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/signin")}
                  className="text-purple-500 hover:text-purple-400 font-medium transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
