import React, { useEffect } from 'react'
import {useState ,useRef,useMemo} from 'react'


const snakegame = () => {

  const grid=15;
 const array_grid = useMemo(
    () => Array.from({ length: grid }, () => Array(grid).fill(0)),
    []
  );

const [snake,setsnake]=useState([
  [0,0]
])



const snakeSet = useMemo(() => {
    return new Set(snake.map(([x, y]) => `${x}-${y}`));
  }, [snake]);

const foodDir=()=>{
   const x=Math.floor(Math.random()*grid);
   const y=Math.floor(Math.random()*grid);
   return [x,y];
}

const directionRef=useRef([1,0]);
const foodRef=useRef(foodDir());
const intervalRef = useRef(null);



useEffect(()=>{
  intervalRef.current = setInterval(() => {
       setsnake((pre)=>{
          const newHead=[pre[0][0]+directionRef.current[0],pre[0][1]+directionRef.current[1]];

         

          if(newHead[0]<0 || newHead[0]>=grid ||newHead[1]<0 || newHead[1]>=grid || pre.some(([x,y])=>{
            if(newHead[0]===x && newHead[1]===y)return true;
          })){
            return [
               [0,0]
            ]
          }
          const copy=pre.map((item)=>[...item]);
           if(newHead[0]===foodRef.current[0] && newHead[1]===foodRef.current[1]){
            foodRef.current=foodDir();
          }else{
          copy.pop();
          }
          copy.unshift(newHead)
          return copy;
       });
  }, 300);

  const handleDir=(e)=>{
     if (e.repeat) return;
   const key=e.key;
  if(key==='ArrowRight' && directionRef.current[0]!=-1){
     directionRef.current=[1,0]
  }else if(key==='ArrowLeft' && directionRef.current[0]!=1){
     directionRef.current=[-1,0]
  }else if(key==='ArrowUp' && directionRef.current[1]!=1){
     directionRef.current=[0,-1]
  }else if(key==='ArrowDown' && directionRef.current[1]!=-1){
     directionRef.current=[0,1]
  }

  }

  window.addEventListener("keydown",handleDir);

  return ()=>{
    clearInterval(intervalRef.current);
    window.removeEventListener("keydown",handleDir);
  }
},[])


 return (
  <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-black 
                  flex flex-col items-center justify-center gap-6">

    <div className="flex items-center gap-3">
      <h1 className="text-4xl font-bold text-green-400 drop-shadow-lg">
        Snake Game
      </h1>
      <img className="w-10 h-10" src="snake.png" alt="snake" />
    </div>

    
    <div
      className="
        grid grid-cols-15 grid-rows-15
        w-[360px] h-[360px]
        lg:w-[620px] lg:h-[620px]
        bg-gray-800
        border-4 border-green-500
        rounded-xl
        shadow-2xl
        overflow-hidden
      "
    >
      {array_grid.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`${x}-${y}`}
            className={`
              w-full h-full
              border border-gray-700
              ${
                snakeSet.has(`${x}-${y}`)
                  ? "bg-[url('snake.png')] bg-cover bg-center rounded-full"
                  : ""
              }
              ${
                foodRef.current[0] === x &&
                foodRef.current[1] === y
                  ? "bg-[url('mouse.png')] bg-cover bg-center"
                  : ""
              }
            `}
          />
        ))
      )}
    </div>

    
    <p className="text-gray-400 text-sm">
      Use ⬅️ ⬆️ ⬇️ ➡️ arrow keys to move
    </p>
  </div>
);

}

export default snakegame
