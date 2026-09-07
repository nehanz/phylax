import { create } from "zustand";

interface AppState {
  theme: "dark" | "light";
  sidebarOpen: boolean;
  autoRefresh: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  toggleAutoRefresh: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: "dark",
  sidebarOpen: true,
  autoRefresh: true,
  toggleTheme: () =>
    set((state) => {
      const nextTheme = state.theme === "dark" ? "light" : "dark";
      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
      return { theme: nextTheme };
    }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleAutoRefresh: () => set((state) => ({ autoRefresh: !state.autoRefresh })),
}));
