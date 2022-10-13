import { Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Home from './componentes/home/Home';
import VideogameList from './componentes/videogamesList/VideogameList';
import VideogamesCreate from "./componentes/videogameCreate/VideogamesCreate";
import { getGenres } from "./redux/actions/index";
import { getPlatforms } from "./redux/actions/index";
import Detail from "./componentes/detail/Detail";



function App() {
  const dispatch = useDispatch();
  
  useEffect( async () => {
    await dispatch(getGenres());
    await dispatch(getPlatforms());
   },[]);

  return (
    <>
      <div className="App">
        <Route exact path="/" component={Home}/>
        <Route exact path="/videogames" component={VideogameList}/>  
        <Route exact path="/videogamecreate" component={VideogamesCreate}/> 
        <Route exact path="/videogamedetail/:id" component={Detail}/>  
      </div>
    </>  
  );
}

export default App;
