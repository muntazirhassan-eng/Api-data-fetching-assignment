import React, { useEffect, useState } from 'react'
import Card from './components/Card';

function App() {

  const [data, setData] = useState([])

  useEffect(() => {
   async function getData ( ) {
    const res = await fetch("https://api.github.com/users")
    const info = await res.json();
    setData(info)
    console.log(info)
   }

   getData()

  }, [])
  
  return (
    <div className='main'>
      {data.map((user)=>{
       return <Card key={user.login} img={user.avatar_url} name={user.login}/>
      })}
    </div>
  )
}

export default App