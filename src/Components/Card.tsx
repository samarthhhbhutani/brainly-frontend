import { Trash } from "./Icons/Trash";
import { TwitterIcon } from "./Icons/TwitterIcon";
import { YoutubeIcon } from "./Icons/YoutubeIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";

export interface CardTypes {
  title: string;
  type: "twitter" | "youtube";
  link: string;
  id?: string;
  setRef?: React.Dispatch<React.SetStateAction<boolean>>;
}

async function deleteContent(id: string) {
  await axios.delete(`${BACKEND_URL}/api/v1/content`, {
    data: {
      contentId: id
    },
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });
}

export function Card({ title, link, type, id, setRef }: CardTypes) {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async () => {
    if (!id || isDeleting) return;
    
    try {
      setIsDeleting(true);
      await deleteContent(id);
      if (setRef) {
        setRef(prev => !prev);
      }
    } catch (error) {
      console.error('Error deleting content:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="group relative">
      <div className="card hover-lift">
        {/* Header */}
        <div className="card-header">
          <div className="flex-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                type === "twitter" ? "bg-blue-50" : "bg-red-50"
              }`}>
                {type === "twitter" ? (
                  <TwitterIcon className="w-5 h-5 text-blue-500" />
                ) : (
                  <YoutubeIcon className="w-5 h-5 text-red-500" />
                )}
              </div>
              <h3 className="font-medium text-gray-900 line-clamp-2">{title}</h3>
            </div>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`btn-icon hover:bg-gray-100 transition-colors ${
                isDeleting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Delete content"
            >
              <Trash className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="card-body">
          {type === "youtube" && (
            <div className="relative pt-[56.25%] rounded-lg overflow-hidden bg-gray-100">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={link.replace("watch", "embed").replace("?v=", "/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          )}
          {type === "twitter" && (
            <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg p-4">
              <blockquote className="twitter-tweet w-full">
                <a href={link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="card-footer">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
          >
            View Original
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
