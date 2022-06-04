import React, {useEffect, useState} from 'react';

interface IProps {
    repositories: {
        node: {
            name: string
        }
    }[]
}

const ListOfRepositories: React.FC<IProps> = ({repositories}) => {

    const renderList = (): JSX.Element[] => {
        return repositories.map((repository, index) => {
            return (
                <li>
                    {repository.node.name}
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