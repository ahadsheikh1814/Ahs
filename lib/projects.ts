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
        imgUrl:"/AHs.webp",
        tech:[
            "Motion",
            "tailwind css",
            "Next js",
            "shadcn/ui"
        ],
        link:"https://ahs-lab.vercel.app",
        LandImg:"/AhsLab.webp",
        GitDir:"https://github.com/ahadsheikh1814/AHs-Lab"
    },
    {
        title:"Treefy",
        description:"All your links. One smart tree. — Share everything you create with one simple Treefy link.",
        imgUrl:"/treefy.webp",
        tech:[
            "tailwind css",
            "Next js",
            "prisma",
            "clerk",
        ],
        link:"https://treefy-three.vercel.app/",
        LandImg:"/treefy.png",
        GitDir:"https://github.com/ahadsheikh1814/Treefy"
    },
]