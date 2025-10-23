type project ={
    title: string;
    description: string;
    imgUrl: string;
    tech: string[];
    link:string;
    LandImg: string;
    GitDir?: string;
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
        link:"https://ahs-lab.vercel.app",
        LandImg:"/AhsLab.png",
        GitDir:"https://github.com/ahadsheikh1814/AHs-Lab"
    }
]