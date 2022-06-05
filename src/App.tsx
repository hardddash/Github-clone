import React, {useState} from 'react';
import ListOfRepositories from "./components/ListOfRepositories";
import SearchBar from "./components/SearchBar";
import {IRepository} from "./interfaces";
import './App.css';

function App() {

    const [repositories, setRepositories] = useState<IRepository[]>([]);


    return (
        <div className="App">
            <SearchBar repositories={repositories} setRepositories={setRepositories}/>
            <ListOfRepositories repositories={repositories}/>
        </div>
    );
}

export default App;
