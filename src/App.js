import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const addNewTransaction = (event) => {
    event.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/transaction';
    fetch (url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        price,
        datetime,
        description,
      }),
    }).then (response => response.json()).then (data => {
      console.log('Success:', data);
    }).catch ((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <main>
      <h1>$400<span>.00</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className='basic'>
          <input 
            type='text' 
            placeholder={'iPhone 13 128GB'}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input 
            type='datetime-local'
            value={datetime}
            onChange={(event) => setDatetime(event.target.value)}
          />
        </div>
        <div className='description'>
          <input 
            type='text' 
            placeholder={'Description'}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <input
            type='number'
            placeholder={'Price'}
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
        <button type='submit'>Add new transaction</button>
      </form>
      <div className="transactions">
        <div className="transaction">
          <div className='left'>
            <div className="name">Samsung Galaxy S21 5G</div>
            <div className='description'>it's a new phone</div>
          </div>
          <div className="right">
            <div className='price green'>+$200</div>
            <div className='date'>2021-01-01 20:00</div>
          </div>
        </div>
        <div className="transaction">
          <div className='left'>
            <div className="name">Samsung Galaxy S21 5G</div>
            <div className='description'>it's a new phone</div>
          </div>
          <div className="right">
            <div className='price red'>-$300</div>
            <div className='date'>2021-01-01 20:00</div>
          </div>
        </div>
        <div className="transaction">
          <div className='left'>
            <div className="name">Samsung Galaxy S21 5G</div>
            <div className='description'>it's a new phone</div>
          </div>
          <div className="right">
            <div className='price green'>+$200</div>
            <div className='date'>2021-01-01 20:00</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
