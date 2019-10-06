import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default function Dashboard(){
  // vou iniciar com um array vazio porque a função de busca no banco sempre retorna um array
  const [spots, setSpots] = useState([]);

  // vou chamar com um filtro de lista vazia para o react chamar essa função uma unica vez
  // e não toda vez que algum elemento desse filtro mudar
  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: { user_id }
      });
  
      setSpots(response.data);
    }

    loadSpots();   
    
  }, []);
  
  return (
    <>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}/>
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
          </li>
        ))}
      </ul>

      <Link to="/new">
          <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  )
}