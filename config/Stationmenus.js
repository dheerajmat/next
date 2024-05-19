
import {
  Application,
  Chart,
  Components,
  DashBoard,
  Stacks2,
  Map,
  Grid,
  Files,
  Graph,
  ClipBoard,
  Cart,
  Envelope,
  Messages,
  Monitor,
  ListFill,
  Calendar,
  Flag,
  Book,
  Note,
  ClipBoard2,
  Note2,
  Note3,
  BarLeft,
  BarTop,
  ChartBar,
  PretentionChartLine,
  PretentionChartLine2,
  Google,
  Pointer,
  Map2,
  MenuBar,
  Icons,
  ChartArea,
  Building,
  Building2,
  Sheild,
  Error,
  Diamond,
  Heroicon,
  LucideIcon,
  CustomIcon,
} from "@/components/svg";
// import { DashBoard } from "@/components/svg";

export const Stationmenus = {
  mainNav: [
    {
      title: "Dashboard",
      icon: DashBoard,
      href: "/",
    },
  ],
  sidebarNav: {
    modern: [
      {
        title: "Dashboard",
        icon: DashBoard,
        href: "/dashboardpage",
      },
    ],
    classic: [
      {
        isHeader: true,
        title: "menu",
      },
      {
        title: "Dashboard",
        icon: DashBoard,
        href: "/station/stationdashboard",
      },
      {
        title: "station",
        icon: DashBoard,
        href: "#",
        child: [
          {
            title: "Staff",
            href: "/station/station/staff",
            icon: Graph,
          },
          {
            title: "Document",
            href: "/station/station/document",
            icon: Cart,
          },
          {
            title: "Customer ",
            href: "/station/station/customer",
            icon: ClipBoard,
          },
          {
            title: "Delivery Scheduling ",
            href: "/station/station/delievery_scheduling",
            icon: ClipBoard,
          }
        ]
      },
      {
        title: "Catalogs",
        icon: DashBoard,
        href: "/Catalogue",
        child: [
          {
            title: "Product",
            href: "/station/Catalogue/Products",
            icon: Graph,
          },
          {
            title: "Categories",
            href: "/station/Catalogue/Categories",
            icon: Cart,
          },
          {
            title: "Document",
            href: "/station/Catalogue/Document",
            icon: ClipBoard,
          }
        ]
      },
      {
        title: "Sales",
        icon: DashBoard,
        href: "#",
        child: [
          {
            title: "Order",
            href: "/station/sales/order",
            icon: Graph,
          },
          {
            title: "Delivery",
            href: "/station/sales/delievery",
            icon: Cart,
          },
          {
            title: "Return",
            href: "/station/sales/return",
            icon: ClipBoard,
          }
        ]
      },
      {
        title: "Purchase",
        icon: DashBoard,
        href: "#",
        child: [
          {
            title: "Requisition",
            href: "/station/Purchase/Requistion",
            icon: Graph,
          },
          {
            title: "PO",
            href: "/station/Purchase/po",
            icon: Cart,
          },
          {
            title: "Delivery",
            href: "/station/Purchase/delievery",
            icon: ClipBoard,
          },
          {
            title: "Returns",
            href: "/station/Purchase/returns",
            icon: ClipBoard,
          }
        ]
        
      },{
        title: "Customer Inquiry",
        icon: DashBoard,
        href: "/station/Customer_Inquiry",
        
      },
      {
        title: "Portals",
        icon: DashBoard,
        href: "#",
        child: [
          {
            title: "Banner",
            href: "/station/portals/Banner",
            icon: Graph,
          },
          {
            title: "Offer & Discount",
            href: "/station/portals/offer&Discount",
            icon: Cart,
          },
          {
            title: "Portal Setting",
            href: "/station/portals/portal_setting",
            icon: ClipBoard,
          }
        ]
      },
      {
        title: "Audit logo",
        icon: DashBoard,
        href: "/station/auditlogs",
        
      },
      {
        title: "Reports",
        icon: DashBoard,
        href: "/station/reports",
        
      }

      
    ],
    

  },
};



