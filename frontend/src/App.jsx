import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('Enter a name to get a greeting!');

  const fetchGreeting = async (e) => {
    e.preventDefault();
    if (!name) {
      setMessage('Please enter a name!');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/greet?name=${name}`);
      const data = await response.text();
      setMessage(data);
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const clearForm = () => {
    setName('');
    setMessage('Enter a name to get a greeting!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Greeting Generator</h1>
        <form onSubmit={fetchGreeting} className="space-y-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Greeting
            </button>
            <button
              type="button"
              onClick={clearForm}
              className="flex-1 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Clear
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-gray-800 text-lg">{message}</p>
      </div>
    </div>
  );
}

export default App;