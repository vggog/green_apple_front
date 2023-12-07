import AdminLogin from "../pages/AdminLogin/AdminLogin"
import AllMasters from "../pages/AllMasters/AllMasters"
import Home from "../pages/Home/Home"
import Logout from "../pages/Logout/Logout"
import MasterInfo from "../pages/MasterInfo/MasterInfo"
import CreateMaster from "../pages/CreateMaster/CreateMaster"


export const publicRoutes = [
    {path: '/', component: Home, exact: true},
    {path: '/admin/auth', component: AdminLogin, exact: true},
    {path: '/admin/logout', component: Logout, exact: true},
    {path: '/admin/master/all', component: AllMasters, exact: true},
    {path: '/admin/master/:id', component: MasterInfo, exact: true},
    {path: '/admin/master/add', component: CreateMaster, exact: true},
]
