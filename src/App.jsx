import { useState,useCallback, useEffect,useRef } from 'react'


function App() {
  const [password,setPassword]=useState("");
  const [length,setlength]=useState(18);
  const [numallw,setnumallw]=useState(false);
  const [charallw,setcharallw]=useState(false);
  const passwordRef = useRef(null)
  
  const passwordChanger=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVEWXYVZabcdefghijklmnopqrstuvwxyz"
    if(numallw==true) str+="0123456789"
    if(charallw==true) str+="!@#$%^&*(_){}?><"
    for(let i=1;i<=length;i++){
      pass+=str.charAt(Math.floor(Math.random()*str.length+1))
    }
     setPassword(pass)
  
  },[password,length,numallw,charallw])

  const copytocpb=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  },[password])

 useEffect(()=>{
  passwordChanger()
 },[length,numallw,charallw])
  

  return (
  <>
    <div className=' w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
    <h1 className=' text-white text-center'>password generator</h1>
 <div className='flex shadow roundlg overflow-hidden mb-4'> 
 <input 
 type="text"
 value={password}
 className='outline-none w-full py-1 px-3'
 placeholder='password'
 readOnly
 ref={passwordRef}
  />
   <button
       onClick={copytocpb}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
  </div>
  <div className=' flex text-sm gap-x-2'>
    <div className=' flex items-center gap-x-1'>
      <input 
      type="range" 
      min={6}
      max={100}
      value={length}
      className=' cursor-pointer'
      onChange={(e)=>{
      setlength(e.target.value)
      }}
       />
       <label>length:{length}</label>
    </div>
    <div className=' flex items-center gap-x-1'>
      <input 
      type="checkbox"
      defaultChecked={numallw}
      id=' numberinput'
      onChange={()=>{setnumallw((prev)=>!prev)}}
       />
       <label htmlFor="numberinput">numbers</label>
    </div>
    <div className=' flex items-center gap-x-1'>
      <input 
      type="checkbox"
      defaultChecked={charallw}
      id=' charinput'
      onChange={()=>{setcharallw((prev)=>!prev)}}
       />
       <label htmlFor="charinput">charaters</label>
    </div>
  </div>
    </div>
  </>
  )
}

export default App
