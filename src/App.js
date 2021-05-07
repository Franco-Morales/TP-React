import './assets/css/App.css';
import { Switch, Route } from "react-router-dom";

import  Home  from "./components/home";
import  Detalle  from "./components/detalle";
import Abm from './components/abm';


function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route path='/home' component={Home}></Route>
      <Route  path='/producto/:id' component={Detalle}></Route>
      <Route  path='/abm' component={Abm}></Route>
    </Switch>
  );
}

export default App;
