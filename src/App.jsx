
import React from 'react'
import { useState } from 'react'

const App = () => {

  const [board,setboard]=useState(Array(9).fill(null));
  const [isXturn,setisXturn]=useState(true);

  const Array_collection=[
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
  ];

  function handleButtom(index){
    if(board[index]!=null){
      return;
    }
    const boardindex=[...board];
    boardindex[index]=isXturn?"X":"O";
    setboard(boardindex);

    setisXturn(!isXturn);

  }

  function checkwinner(){
    for(let i of Array_collection){
      const [a,b,c]=i;

      if(board[a] && board[a]==board[b] && board[a]==board[c]){
        return board[a];
      }
    
    }
    return null;  
  }


  function winner(){
    const win=checkwinner();

    if(win){
      return "Winner is "+win;
    }else if(!board.includes(null)){
      return "It's a Tie";
    }else{
      return "No Winner Yet";
    }
  }



  function reset(){
    setboard(Array(9).fill(null));
    setisXturn(true);
  }


 








  return (
    <div className='h-screen w-screen flex flex-col gap-4 justify-center items-center bg-gray-700'>
       <h1 className='absolute top-5 text-6xl font-bold'>TIC TOE GAME 😜</h1>

       <h1 className='absolute top-24 text-4xl'>Winner:- {winner()}</h1>

       <div className='w-1/2 flex flex-wrap gap-2 justify-center items-center'>
       <button className='border-2 bg-pink-500 p-2 font-bold text-2xl  rounded-2xl hover:scale-90' onClick={reset} >New Game</button>
       <button className='border-2  bg-pink-500 p-2 font-bold text-2xl rounded-2xl hover:scale-90' onClick={reset}>RESET</button>
       </div>

       <div className='w-1/3 h-1/2 bg-green-500 rounded-2xl shadow-green-200 grid grid-cols-3 grid-rows-3 border-2 gap-2 p-2'>
         {board.map((value,index)=><button className='border-2 py-4 rounded-2xl bg-black text-white hover:bg-amber-900 text-6xl font-bold' onClick={()=>handleButtom(index)}>{value}</button>
        )}
          
       </div>
      
    
      
    </div>
  )
}

export default App
