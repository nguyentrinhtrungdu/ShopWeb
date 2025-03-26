import {ManagerLayout} from '../components/Layout';

import Home from '../pages/Home'
import Payment from '../pages/Payment' 
import Category from '../pages/manage/Category'
import Account from '../pages/manage/Account'
import Orders from '../pages/manage/Orders'

const publicRoutes = [
    { path: '/' , Component: Home},
    { path: '/payment' , Component: Payment},
   
]
const privateRoutes = [
    { path: '/category' , Component: Category, layout: ManagerLayout},
    { path: '/account' , Component: Account, layout: ManagerLayout},
    { path: '/orders' , Component: Orders, layout: ManagerLayout},
  
]
 export {privateRoutes, publicRoutes}