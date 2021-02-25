
import React, {useState, useEffect} from 'react'

import api from './services/api'

import "./styles.css"

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    getRepositories()
  }, []);

  function getRepositories() {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }

  async function handleAddRepository() {

    const count = repositories.length > 0 ? repositories.length + 1 : 1
    
    const response = await api.post('repositories', {
      title: 'Repositório ' + count,
      url: 'https://rodrigoengelberg.com.br',
      techs: ['Node.js', 'ReactJS']
    })

    setRepositories([...repositories, response.data])
    
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`repositories/${id}`)

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))

  }

  return (
    <div>

      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <>
            <li key={repository.id}>
              {repository.title}
              <button type="button" onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
            </>
          )
          })
        }
      </ul>

      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App
