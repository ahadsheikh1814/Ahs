type project ={
    title: string;
    description: string;
    imgUrl: string;
    tech: string[];
    link:string;
}

export const Projects:project[] = [
    {
        title:"AHs Lab",
        description:"UI Components for Developers. Cut boilerplate, ship faster with AHs Lab.",
        imgUrl:"/AHs.png",
        tech:[
            "Motion",
            "tailwind css",
            "Next js",
            "shadcn/ui"
        ],
        link:"https://ahs-lab.vercel.app"
    }
]