import { useEffect, useState } from 'react';
import './App.css'
import { io } from "socket.io-client"
const url = import.meta.env.VITE_BACKEND_URL
const socket = io(url);
function App() {

  const [text, settext] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    settext(value);
    socket.emit('update', value)
  }
  useEffect(() => {
    const handleReceive = (content) => {
      settext(content)
    }

    socket.on('recieve-update', handleReceive);

    return () => {
      socket.off('recieve-update', handleReceive);
    };
  }, []);

  return (
    <>
      <div className='w-screen '>

        <div className='w-full bg-blue-700'>
          <div className='h-[80px] max-w-[800px] mx-auto flex items-center'>
            <h1 className='text-white font-bold text-2xl'>Collaborator</h1>
          </div>
        </div>


        <div className='flex flex-col items-center mt-10'>
          <h3 className='font-bold text-blue-400'>Your Text Here</h3>
          <textarea className='border w-[500px] h-[100px] p-2 text-lg' value={text} onChange={handleChange} />
        </div>

      </div>
    </>
  )
}

export default App
