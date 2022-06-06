import React, {useState} from 'react';
import ListOfRepositories from "./components/ListOfRepositories";
import SearchBar from "./components/SearchBar";
import {IRepository} from "./interfaces";
import style from './App.module.css';
import ProfileCard from "./components/ProfileCard";

function App() {

    const [repositories, setRepositories] = useState<IRepository[]>([]);

    return (
        <div className={style.appContainer}>
            <div className={style.appItem1}>
                <ProfileCard/>
            </div>
            <div className={style.appItem2}>
                <SearchBar repositories={repositories} setRepositories={setRepositories}/>
            </div>
            <div className={style.appItem3}>
                <ListOfRepositories repositories={repositories}/>
            </div>
        </div>
    );
}

export default App;
