import Login from '../pages/login/Login.jsx';
//import bots controle parts
import Autotrade from "../pages/bots/Autotrade";
import BotForm from "../pages/bots/BotForm";
import Bots from "../pages/bots/Bots";
//papare trading parts
import TestAutotrade from "../pages/paper-trading/TestAutotrade";
import TestBotForm from "../pages/paper-trading/TestBotForm";
import TestBots from "../pages/paper-trading/TestBots";
//import dashboard
import Dashboard from "../pages/dashboard/Dashboard";
//import research
import Research from "../pages/research/Research";
//import not found page
import NotFound from "../pages/NotFound.jsx";


const routes = [
  {
    path: "/login",
    name: "Login",
    icon: null,
    component: Login,
    layout: null,
    nav: false,
    private: false,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    nav: true,
    private: true,
  },
  {
    path: "/bots",
    name: "Bots",
    icon: "nc-icon nc-laptop",
    component: Bots,
    layout: "/admin",
    nav: true,
    private: true,
  },
  {
    path: "/bots/new/:symbol?",
    name: "Create new Bot",
    icon: "nc-icon nc-laptop",
    component: BotForm,
    layout: "/admin",
    nav: false,
    private: true,
  },
  {
    path: "/bots/edit/:id",
    name: "Edit Bot",
    icon: "nc-icon nc-laptop",
    component: BotForm,
    layout: "/admin",
    nav: false,
    private: true,
  },
  {
    path: "/bots/autotrade",
    name: "Bots Autotrade",
    icon: "",
    component: Autotrade,
    layout: "/admin",
    nav: false,
    private: true,
  },
  {
    path: "/paper-trading",
    name: "Paper trading",
    icon: "nc-icon nc-paper",
    component: TestBots,
    layout: "/admin",
    nav: true,
    private: true,
  },
  {
    path: "/paper-trading/new/:symbol?",
    name: "Create new test Bot",
    icon: "nc-icon nc-paper",
    component: TestBotForm,
    layout: "/admin",
    nav: false,
    private: true,
  },
  {
    path: "/paper-trading/new",
    name: "Create new test Bot",
    icon: "nc-icon nc-paper",
    component: TestBotForm,
    layout: "/admin",
    nav: false,
    private: true,
  },
  {
    path: "/paper-trading/edit/:id",
    name: "Edit test Bot",
    icon: "nc-icon nc-paper",
    component: TestBotForm,
    layout: "/admin",
    nav: false,
    private: true,
  },
  {
    path: "/paper-trading/autotrade",
    name: "Test bots Autotrade",
    icon: "",
    component: TestAutotrade,
    layout: "/admin",
    nav: false,
    private: true,
  },
  {
    path: "/research",
    name: "Research",
    icon: "nc-icon nc-ruler-pencil",
    component: Research,
    layout: "/admin",
    nav: true,
    private: true,
  },
  {
    path: "*",
    name: "Not found",
    component: NotFound,
    layout: "/admin",
    nav: false,
    private: true,
  },
];
export default routes;
