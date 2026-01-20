import React from 'react'
import { useState ,useEffect} from 'react'
import Calculatorloaded from './components/Calculatorloaded';

const calculator = () => {

    const [input,setinput]=useState([]);
    const [showCalculator, setShowCalculator] = useState(false);


    const array_button=[
        'C','+/-','%','/',
        '7','8','9','*',
        '4','5','6','-',
        '1','2','3','+',
        '0','.','=', '√',
        'X'
    ]


    useEffect(() => {
       const timer = setTimeout(() => {  
        setShowCalculator(true);
            }, 2000);
            return ()=>clearTimeout(timer);
        
}, []);

    function handleButton(val){
        const value=val;
       if(value==='X'){
        const array=[...input];

        array.pop();
        setinput(array);
        return;
       }
        
        if(value==='C'){
            clear();
        }
        else if(value==='√'){
            const expr=input.join('');
            try{
                const result=Math.sqrt(eval(expr));
                console.log(result);
                setinput([result.toString()]);
            }   
            catch(error){
                setinput(['Error']);
            
            }
        }

       else if(value==='+/-'){
            plus_minus();
        }
        else if(value==='='){
            calculate();
        }
        else {
            setinput([...input,value]);
        }
        for(let i of input){
            console.log(i);
        }

    }

    function calculate(){
        const expr=input.join('');
        try{
            const result=eval(expr);
        
          
            setinput([result.toString()]);
        }
        catch(error){
            setinput(['Error']);
        }

    }

    function clear(){
        setinput([]);
    }

    function apply(expr){
        const checkpriority=priority(expr);
    }


   

    function plus_minus(){
        if(input.length===0) return;    
        const expr=input.join('');
        try{
            const result=eval(expr);
            const negated=(-1*result).toString();
            setinput([negated]);
        }       
        catch(error){
            setinput(['Error']);
        }
    }
 return (
  <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">

    {!showCalculator ? (
      <Calculatorloaded />
    ) :(
    
    <div className="w-[90%] max-w-sm bg-gray-800 rounded-3xl shadow-2xl p-6">
      
      {/* Display */}
      <div className="bg-black text-green-400 text-right text-4xl font-mono rounded-2xl px-4 py-6 mb-6 overflow-hidden">
        {input.length === 0 ? "0" : input}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-4">

        {array_button.map((value, index) => (
          <button
            key={index}
            onClick={() => handleButton(value)}
            className={`
              h-16 rounded-xl text-xl font-semibold
              transition-all duration-150 active:scale-95
              ${
                value === '='
                  ? 'bg-green-500 text-black col-span-2'
                  : value === 'C'
                  ? 'bg-red-500'
                  : ['+', '-', '*', '/', '%', '√'].includes(value)
                  ? 'bg-orange-400 text-black'
                  : 'bg-gray-600'
              }
              hover:brightness-110
            `}
          >
            {value}
          </button>
        ))}

      </div>
    </div>

)}
  </div>
);

}

export default calculator
