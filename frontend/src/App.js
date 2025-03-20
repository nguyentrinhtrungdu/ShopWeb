
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {publicRoutes,privateRoutes} from './routes'
import Defaultlayout from './components/Layout/DefaultLayout';
import { Fragment } from 'react';

function App() {
  return (
    <Router>
        <div className="App">
            <Routes>
                  {publicRoutes.map((route , index)=>{
                    const Pages =route.Component

                    let Layout = Defaultlayout

                    if(route.layout){

                      Layout = route.layout
                    }
                    else if(route.layout === null){
                      Layout = Fragment
                    }

                 
                    return <Route key = {index}
                                  path = {route.path} 
                                  element ={
                                      <Layout>
                                          <Pages/>
                                      </Layout>
                                    } 
                          />
                  })}
                  {privateRoutes.map((route , index)=>{
                    const Pages =route.Component

                    let Layout = Defaultlayout

                    if(route.layout){

                      Layout = route.layout
                    }
                    else if(route.layout === null){
                      Layout = Fragment
                    }

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
