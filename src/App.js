import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');

  const addNewTransaction = (event) => {
    event.preventDefault();
    console.log(name, datetime, description);
  }

  return (
    <main>
      <h1>$400<span>.00</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className='basic'>
          <input 
            type='text' 
            placeholder={'+200 new Samsung Galaxy S21 5G'}
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
            placeholder={'description'}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
