import type { NavbarItemData } from "$lib/models/types";

export const navbarItems: NavbarItemData[] = [{
    title: "Home",
    path: "/",
    isMain: true
},
{	
    title: "About",
    path: "",
    isMain: true,
    subitems: [
        {
            title: "About Me",
            path: "/about/me"
        },  
        {   
            title: "About This Site",
            path: "/about/site"
        }]
},
{
    title: "Sverdle",
    path: "/sverdle",
    isMain: true
}];