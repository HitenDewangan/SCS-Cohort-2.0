import React from 'react'

const Button = (props) => {
  return (
    <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5">
            {props.text}
        </button>
    </div>
  )
}

export default Button
