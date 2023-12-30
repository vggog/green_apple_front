import AdminLogin from "../pages/AdminLogin/AdminLogin"
import AllMasters from "../pages/AllMasters/AllMasters"
import Home from "../pages/Home/Home"
import Logout from "../pages/Logout/Logout"
import MasterInfo from "../pages/MasterInfo/MasterInfo"
import CreateMaster from "../pages/CreateMaster/CreateMaster"
import NotFound from "../pages/NotFound/NotFound"

import MasterLogin from "../pages/MasterLogin/MasterLogin"
import AllRepairOrders from "../pages/AllRepairOrders/AllRepairOrders"


export const publicRoutes = [
    {path: '/', component: Home, exact: true},
]

export const adminRoutes = [
    {path: '/admin/logout', component: Logout, exact: true},
    {path: '/admin/master/all', component: AllMasters, exact: true},
    {path: '/admin/master/:id', component: MasterInfo, exact: true},
    {path: '/admin/master/add', component: CreateMaster, exact: true},
]

export const masterRoutes = [
    {path: '/repair_orders/all', component: AllRepairOrders, exact: true}
]

export const systemRoutes = [
    {path: '/admin/auth', component: AdminLogin, exact: true},
    {path: '/master/auth', component: MasterLogin, exact: true},
    {path: '*', component: NotFound, exact: true},
]
