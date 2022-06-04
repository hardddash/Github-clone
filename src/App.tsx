import React, { useEffect, useState } from 'react';
import ListOfRepositories from "./components/ListOfRepositories";
import logo from './logo.svg';
import './App.css';

interface IState {
  repositories: {
    node: {
      name: string
    }
  }[]
}

function App() {

  const [repositories, setRepositories] = useState<IState["repositories"]>([]);
  const [SearchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const options = {
      searchTerm: SearchTerm
    };
    getRepositories(options);
  }, []);

  const getRepositories = (options: any) => {
    const body = {
      "query": `
      query {
          search(query: \"${options.searchTerm} in:name user:${process.env.REACT_APP_GITHUB_USERNAME}\", type: REPOSITORY, first: 50) {
            repositoryCount
            edges {
              node {
                ... on Repository {
                  name
                }
              }
            }
          }
        
      }
      `
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
        })
        .catch(err => console.error(JSON.stringify(err)));
  };

  const updateSearchTerms = (newSearchTerm: string) => {
    const options = {
      searchTerm: newSearchTerm,
    };

    setSearchTerm(newSearchTerm);
    getRepositories(options);
  };

  return (
    <div className="App">
      <ListOfRepositories repositories={repositories}/>
    </div>
  );
}

export default App;
