import React from 'react'
import { use } from 'react';
import { useState } from 'react';

const App = () => {

  const [marks, setMarks] = useState([65, 70, 75, 80, 85]);


  function graceStudents(marks) {
    const updatedMarks = marks.map(mark => mark + 5);
    setMarks(updatedMarks);
  }

  return (
    <div>
      {marks.map((mark, index) => (
        <h1 key={index}>Mark {index + 1}: {mark}</h1>
      ))}
      <button onClick={() => graceStudents(marks)}>Add Grace Marks</button>
      
    </div>
  )
}

export default App
