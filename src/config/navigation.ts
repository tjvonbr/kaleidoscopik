export interface MainNavigation {
  main: MainNavigationItem[];
}

interface MainNavigationItem {
  title: string;
  href: string;
}

export const navigation: MainNavigation = {
  main: [
    {
      title: "Explore",
      href: "/explore",
    },
    {
      title: "Create",
      href: "/create",
    },
  ],
};
