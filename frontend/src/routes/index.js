import {ManagerLayout,LoginAndSigninLayout} from '../components/Layout';


import Home from '../pages/Home'
import Payment from '../pages/Payment' 
import Category from '../pages/manage/Category'
import Account from '../pages/manage/Account'
import Orders from '../pages/manage/Orders'
import {LogIn,SignIn} from '../pages/loginAndSignin'
const publicRoutes = [
    { path: '/' , Component: Home},
    { path: '/payment' , Component: Payment},
    { path: '/login' , Component: LogIn, layout: LoginAndSigninLayout},
    { path: '/signin' , Component: SignIn,layout: LoginAndSigninLayout},
   
]
const privateRoutes = [
    { path: '/category' , Component: Category, layout: ManagerLayout},
    { path: '/account' , Component: Account, layout: ManagerLayout},
    { path: '/orders' , Component: Orders, layout: ManagerLayout},
  
]
 export {privateRoutes, publicRoutes}