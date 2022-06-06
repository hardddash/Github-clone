import React from 'react';
import RepositoryCard from "./RepositoryCard";
import {IRepository} from "../interfaces";

interface IProps {
    repositories: IRepository[]
}

const ListOfRepositories: React.FC<IProps> = ({repositories}) => {

    const renderList = (): JSX.Element[] => {
        return repositories.map((repository) => {
            return (
                <li key={repository.node.databaseId}>
                    <RepositoryCard repository={repository}/>
                </li>
            )
        })
    }
    return (
        <ul>
            {renderList()}
        </ul>
    )
}

export default ListOfRepositories;