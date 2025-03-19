
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {publicRoutes,privateRoutes} from './routes'
import Defaultlayout from './components/Layout/DefaultLayout';
function App() {
  return (
    <Router>
        <div className="App">
            <Routes>
                  {publicRoutes.map((route , index)=>{
                    const Layout = route.Layout || Defaultlayout;
                    const Pages =route.Component
                    return <Route key = {index}
                                  path = {route.path} 
                                  element ={
                                      <Layout>
                                          <Pages/>
                                      </Layout>
                                    } 
                          />
                  })}
            </Routes>
        </div>
    </Router>
  );
}

export default App;
