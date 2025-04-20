export type NavbarItemData = {
    title: string;
    path: string;
    isMain?: boolean;
    subitems?: NavbarItemData[];
}
