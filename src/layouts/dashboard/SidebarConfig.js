import { Icon } from "@iconify/react";

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "general",
    items: [
      {
        title: "overview",
        path: "/portal/overview",
        icon: <Icon icon="akar-icons:home" width={30} />,
      },
      {
        title: "my places",
        path: "/portal/myplaces",
        icon: <Icon icon="akar-icons:check-in" width={30} />,
      },
      {
        title: "reservations",
        path: "/portal/reservations",
        icon: <Icon icon="akar-icons:coffee" width={30} />,
      },
      {
        title: "inbox",
        path: "/portal/inbox",
        icon: <Icon icon="akar-icons:inbox" width={30} />,
      },
      {
        title: "explore",
        path: "/places",
        icon: <Icon icon="akar-icons:cursor" width={30} />,
      },
    ],
  },
];

export default sidebarConfig;
