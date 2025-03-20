import {ManagerLayout} from '../components/Layout';

import Home from '../pages/Home'
import Payment from '../pages/Payment' 
import Category from '../pages/manage/Category'
import Account from '../pages/manage/Account'
import Orders from '../pages/manage/Orders'

const publicRoutes = [
    { path: '/' , Component: Home},
    { path: '/Payment' , Component: Payment},
   
]
const privateRoutes = [
    { path: '/Category' , Component: Category, layout: ManagerLayout},
    { path: '/Account' , Component: Account, layout: ManagerLayout},
    { path: '/Orders' , Component: Orders, layout: ManagerLayout},
  
]
 export {privateRoutes, publicRoutes}