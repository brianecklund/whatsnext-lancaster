
"use client";
import { useState } from "react";

export default function IntroSection({children}:{children?:React.ReactNode}){
const [open,setOpen]=useState(false)

const items=[
"Live music tonight at Tellus 360",
"Trivia at Southern Market Wednesday",
"Open mic at West Art Tuesday",
"Fulton Theatre mainstage this weekend",
"Gallery opening at Ware Center Friday",
"DJ set rooftop party Saturday"
]

return(
<section className="introSection">
<div>
{children}
<button className="mobileTickerToggle" onClick={()=>setOpen(!open)}>
{open ? "Close updates" : "Show updates"}
</button>
</div>

<div className={`ticker ${open?"open":""}`}>
<div className="ticker-track">
{items.concat(items).map((i,idx)=>(
<div key={idx} className="ticker-item">{i}</div>
))}
</div>
</div>
</section>
)
}
