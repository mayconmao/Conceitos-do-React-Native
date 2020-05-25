import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() =>{
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);
  async function handleAddRepository() {   
    
    const response = await api.post('repositories', {               
      title: `Repositorio ${Date.now()}`,
      url: 'https://github.com/teste',
      techs: ["NodeJS","ReactJS","javascript"]
    }); 

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {  
      await api.delete(`repositories/${id}`);
      const newRepository = repositories.filter(repository => repository.id !== id);      
      setRepositories(newRepository);   
    }
    
  

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li key={repository.id}>
          <strong>{repository.title}</strong> &nbsp; ({repository.url})
              [{repository.techs.map(tech => <span key={tech}>{tech}</span>)}]
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;



