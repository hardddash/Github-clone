import React, {useEffect, useState} from 'react';
import Select from 'react-select'
import {IRepository} from "../interfaces";
import style from './SearchBar.module.css'
import {customStyles} from "./reactSelectCustomStyles";

interface IProps {
    repositories: IRepository[],
    setRepositories: React.Dispatch<React.SetStateAction<IRepository[]>>
    setRepositoriesNumber: React.Dispatch<React.SetStateAction<number>>
}

const SearchBar: React.FC<IProps> = ({repositories, setRepositories, setRepositoriesNumber}) => {

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const options = {
            searchTerm: searchTerm
        };
        getRepositories(options);
    }, []);

    const getRepositories = (options: any) => {
        const body = {
            "query": `
            query {
              search(query: \"${options.searchTerm} in:name user:${process.env.REACT_APP_GITHUB_USERNAME}\", type: REPOSITORY, first: 50) {
                edges {
                  node {
                    ... on Repository {
                      name
                      description
                      forkCount
                      isPrivate
                      languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
                        nodes {
                          color
                          name
                        }
                      }
                      licenseInfo {
                        name
                      }
                      updatedAt
                      url
                      stargazerCount
                      databaseId
                    }
                  }
                }
              }
            }`
        }
        fetch(process.env.REACT_APP_GITHUB_BASEURL || "", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.REACT_APP_GITHUB_ACCESS_TOKEN
            },
            body: JSON.stringify(body)
        }).then(response => response.json())
            .then(data => {
                setRepositories(data.data.search.edges);
                if (repositories.length === 0 && searchTerm === '')
                    setRepositoriesNumber(data.data.search.edges.length);
            })
            .catch(err => console.error(JSON.stringify(err)));
    };

    const updateSearchTerms = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value.toLowerCase();
        const options = {
            searchTerm: newSearchTerm,
        };

        setSearchTerm(newSearchTerm);
        getRepositories(options);
    };

    return (
        <div>
            <div className={style.optionsContainer}>
                <input onChange={updateSearchTerms} placeholder="Find a repository..." value={searchTerm}/>
                <div className={style.selectsContainer}>
                    <Select
                        options={
                            [
                                {value: 'all', label: 'All'},
                                {value: 'public', label: 'Public'},
                                {value: 'private', label: 'Private'}
                            ]
                        }
                        styles={customStyles}
                        placeholder={'Type'}
                        isSearchable={false}
                    />
                    <Select
                        options={
                            [
                                {value: 'all', label: 'All'},
                                {value: 'typescript', label: 'Typescript'},
                                {value: 'javascript', label: 'Javascript'},
                                {value: 'html', label: 'HTML'},
                                {value: 'java', label: 'Java'}
                            ]
                        }
                        styles={customStyles}
                        placeholder={'Language'}
                        isSearchable={false}
                    />
                    <Select
                        options={
                            [
                                {value: 'last updated', label: 'Last updated'},
                                {value: 'name', label: 'Name'},
                                {value: 'stars', label: 'Stars'},
                            ]
                        }
                        styles={customStyles}
                        placeholder={'Select order'}
                        isSearchable={false}
                    />
                </div>
            </div>

            {
                searchTerm &&
                <div className={style.hintContainer}>
                    <p>
                        <b>{repositories.length}</b> results for repositories matching <b>{searchTerm}</b>
                    </p>
                    <button className={style.clearFilterContainer} onClick={() => {
                        setSearchTerm('');
                        getRepositories({searchTerm: ''})
                    }}>
                        <svg className={style.svgCancel}>
                            <path fillRule="evenodd"
                                  d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
                        </svg>
                        <span>Clear filter</span>
                    </button>
                </div>

            }
        </div>
    )
}

export default SearchBar;