import Home from '../pages/Home'
import Payment from '../pages/Payment' 

const publicRoutes = [
    { path: '/' , Component: Home},
    { path: '/Payment' , Component: Payment},
]
const privateRoutes = [

]
 export {privateRoutes, publicRoutes}