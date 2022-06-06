import React, {useEffect, useState} from 'react';
import ListOfRepositories from "./components/ListOfRepositories";
import SearchBar from "./components/SearchBar";
import NavBar from "./components/NavBar";
import ProfileCard from "./components/ProfileCard";
import {IRepository} from "./interfaces";
import style from './App.module.css';

function App() {

    const [repositories, setRepositories] = useState<IRepository[]>([]);
    const [repositoriesNumber, setRepositoriesNumber] = useState(0);

    const navBarProperties = {
        repositoriesNumber: repositoriesNumber,
        projectsNumber: 0,
        packagesNumber: 2
    };

    return (
        <div className={style.appContainer}>
            <div className={style.appItem1}>
                <ProfileCard/>
            </div>
            <div className={style.appItem2}>
                <NavBar navBarProperties={navBarProperties}/>
            </div>
            <div className={style.appItem3}>
                <SearchBar repositories={repositories}  setRepositories={setRepositories} setRepositoriesNumber={setRepositoriesNumber}/>
            </div>
            <div className={style.appItem4}>
                <ListOfRepositories repositories={repositories}/>
            </div>
        </div>
    );
}

export default App;
