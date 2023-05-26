import { Route, Switch } from 'react-router-dom'
import Pokedex from './pages/pokedex';
import Pokemon from './pages/pokemon';
import './App.css';

const App = () => {
    return(
        <div>
            <Switch>
                <Route exact path="/" component={Pokedex} />    
                <Route exact path="/pokemon/:name" component={Pokemon} />  
            </Switch>
        </div>
    )
}

export default App;
