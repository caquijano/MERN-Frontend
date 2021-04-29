import React from 'react'
import { IoEye, IoGrid, IoHome , IoClipboardSharp, IoPeople} from 'react-icons/io5';

export const SideBarData =[
    {
        title: "Usuarios" ,
        icon: <IoPeople/>,
        link: "/userlist",
        rol: "admin"
    },
    {
        title: "Home" ,
        icon: <IoHome/>,
        link: "/",
        
    },
    {
        title: "Activos" ,
        icon: <IoGrid/>,
        link: "/activos",

    },
    {
        title: "Inventario" ,
        icon: <IoClipboardSharp/>,
        link: "/Home",
        
    },
    {
        title: "Otros" ,
        icon: <IoEye/>,
        link: "/Home",
        
    },
    {
        title: "mas de otros" ,
        icon: <IoEye/>,
        link: "/Home",
        
    },
]
