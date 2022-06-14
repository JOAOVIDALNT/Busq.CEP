import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import './style.css';
import api from './services/api';


function App() {

//  PRESS ENTER 
  document.addEventListener('keypress', function(e) {
    if (e.key === "Enter") {
      const btn = document.querySelector('.searchButton');

      btn.click();
    }

  });



  const [input, setInput] = useState('')
  const [cep, setCep] = useState('')

  async function handleSearch() {
    
    if (input === '') {
      alert('preencha com algum cep')
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput('')
    }
    catch {
      alert('erro ao buscar cep')
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title">Busq.CEP</h1>
      
      <div className="containerInput">
        <input type="text" placeholder='Digite seu cep...' value={input}
        onChange={ (event) => setInput(event.target.value)

        }/>

        <button className="searchButton" onClick={handleSearch}> 
          <BsSearch size={25} color="#fff"/>
        </button>
      </div>


        {Object.keys(cep).length > 0 && (
          
      <main className='main'>
        <h2>CEP: {cep.cep}</h2>

        <span>{cep.logradouro}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
      </main>

        )}

      
      
    </div>
  );
}

export default App;
