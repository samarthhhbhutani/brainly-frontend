import { ShareIcon } from "./Icons/ShareIcon";
import { TwitterOld } from "./Icons/Twitter";
import { TwitterIcon } from "./Icons/TwitterIcon";
import { Youtubeicon } from "./Icons/YoutubeIcon";

export interface CardTypes{
    title:string,
    type:"twitter" | "youtube",
    link: string
}


export function Card({title,link,type}:CardTypes){
    console.log(title)
    return(
        <div>
        <div className="bg-white rounded-md border-gray-200 p-4 max-w-72 border min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex items-center trext-md">
                    <div className="pr-2 text-gray-500">
                    {type==="twitter" && <TwitterIcon/>}
                    {type==="youtube" && <Youtubeicon/>}
                    </div>
                    
                    {title}
                    
                </div>
                <div className="flex items-center">
                    
                    <div className="pr-2 text-gray-500">
                        <ShareIcon/>
                    </div>
                </div>
            </div>
            <div className="pt-4">
            {type==="youtube" && <iframe className="w-full" src={link.replace("watch","embed").replace("?v=","/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
            </div>
            {type==="twitter" && <blockquote className="twitter-tweet">
                <a href={link.replace("x.com","twitter.com")}></a> 
            </blockquote>}
        </div>
        
        </div>
    )
}