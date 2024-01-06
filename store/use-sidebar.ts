import { create } from "zustand";

export type SideBarStore = {
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void;
};

export const useSideBar = create<SideBarStore>((set) => ({
    collapsed: false,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true }))
}));
