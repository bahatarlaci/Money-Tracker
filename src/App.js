import { useEffect, useState, useCallback } from 'react';
import { format } from 'date-fns';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const url = `${process.env.REACT_APP_API_URL}/transactions`;

  const updateBalance = useCallback((data) => {
    const totalBalance = data.reduce((total, transaction) => total + transaction.price, 0);
    setBalance(totalBalance);
  }, []);

  const getTransactions = useCallback(async () => {
    try {
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
        updateBalance(data);
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error('Error retrieving transactions:', error);
    }
  }, [url, updateBalance]);

  const addNewTransaction = async (event) => {
    event.preventDefault();
    const newTransaction = {
      name,
      price,
      datetime,
      description,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions([...transactions, data]);
        updateBalance([...transactions, data]);
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleDelete = (id) => async () => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        const newTransactions = transactions.filter((transaction) => transaction._id !== id);
        setTransactions(newTransactions);
        updateBalance(newTransactions);
      } else {
        throw new Error('API request failed');
      }
    }
    catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);
  
  useEffect(() => {
    if (transactions.length > 0) {
      updateBalance(transactions);
    }
  }, [transactions, updateBalance]);

  return (
    <main>
      <h1><span>Balance:</span> {balance}$</h1>
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
            placeholder={'Price (-200) or (200)'}
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
        <button type='submit'>Add new transaction</button>
      </form>
      <div className="transactions">
        {
          transactions.map((transaction) => {
            return (
              <div className="transaction" key={transaction._id}>
                <div className='left'>
                  <div className="name">{transaction.name}</div>
                  <div className='description'>{transaction.description}</div>
                </div>
                <div className="right">
                  <div className={`price ${transaction.price > 0 ? 'green' : 'red'}`}>{transaction.price}$</div>
                  <div className='date'>{format(new Date(transaction.datetime), 'dd/MM/yyyy')}</div>
                  <button className='delete' onClick={ handleDelete(transaction._id) }>Delete</button>
                </div>
              </div>
            );
          }
        )}
      </div>
    </main>
  );
}

export default App;
