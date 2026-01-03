import React from 'react'
import Card from './components/Card'
import Button from './components/Button'

const App = () => {
  //  space to declare and modify variables
  const name = "hided"
  const arr = ['hided', 'sadie', 'john', 'doe']

  // space to return
  return (
    <div>
      <div className='text-2xl via-red-700 to-red-800 bg-amber-500 from-orange-500'>
        Hii guys
        <div className="h-14 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
        <Card />
        {}Welcome <b>{name}</b> to React World!
      </div>
      <div className="mt-4">
        {arr.map( (item, index) => (
          <h3 className=" p-5 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 m-2">{item}</h3>
        ))}
      </div>
      {Card()}

      <Button text="Click Me" />
      <Button text="Buy me" />
      <Button text="Push me" />

      <div>
        {arr.map( (item, index) => (
          <Button key={index} text={item} />
        ))}
      </div>

    </div>
  )
}

export default App
