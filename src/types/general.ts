export type TSidebarLink = {
    id: number;
    name: string;
    link: string;
    icon?: React.ReactNode;
};

export type TCategoryInfo = {
    id: string;
    name: string;
    thumbnail: string;
    createdAt: string;
    updatedAt: string;
};

export type TBrandInfo = {
    id: string;
    name: string;
    thumbnail: string;
    createdAt: string;
    updatedAt: string;
};
