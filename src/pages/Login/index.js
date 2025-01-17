import React, { useState } from 'react';

import api from '../../services/api';


export default function Login({ history }) {
  const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post('/sessions', { email });

    const { _id } = response.data;

    localStorage.setItem('user', _id);

    history.push('./dashboard')
  }

  return (
    // Vou criar uma tag vazia (fragment) para não influenciar no css
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa.
        </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">EMAIL *</label>
        <input
          type="email"
          id="email"
          placeholder="Seu melhor email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <button className="btn" type="submit">Entrar</button>
      </form>
    </>
  )
}