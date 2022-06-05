import React from 'react';
import {IRepository} from "../interfaces";

interface IProps {
    repositories: IRepository[]
}

const ListOfRepositories: React.FC<IProps> = ({repositories}) => {

    const renderList = (): JSX.Element[] => {
        return repositories.map((repository) => {
            return (
                <li key={repository.node.databaseId}>
                    {repository.node.name + " " + repository.node.isPrivate + " " + repository.node.databaseId}
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