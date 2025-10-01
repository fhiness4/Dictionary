import { useState } from 'react'
import  AdvancedAutoBook from './loading.jsx'

import './App.css'

function App() {
  const[data, setData]= useState('');
  const[component, setComponent] = useState(true)
  const [input, setInput] = useState('');
  const [sound, setSound] = useState('');
  const [explainn, setExplainn] = useState('definition will be displayed here!....');
  const [explain, setExplain] = useState('');
  const [example, setExample] = useState('');
  const [synonyms, setSynonyms] = useState('');
  const [soundv, setSoundv] = useState(null);
  const [part, setpart] = useState([]);
  let audio = document.getElementById('sound');
  
  function inputdata(e) {
     setInput(e.target.value);
  }
 async function fectchdata() {
    
     try {
      setComponent(false)
       audio.hidden = false;
       const meaning = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`,{
      Headers:{
        Accept: 'aplication/json'
      }}
     )

     const meaningdata = await meaning.json();
      setData(meaningdata[0].word);
     setSound(meaningdata[0].phonetics[1].text);
     setExplainn('EXPLANATION');
     setExplain(meaningdata[0].meanings[0].definitions[0].definition);
     setExample('example :'+meaningdata[0].meanings[0].definitions[3].example);
     setSynonyms(
      'synonyms : '+ meaningdata[0].meanings[0].synonyms
        
      );
      setSoundv(meaningdata[0].phonetics[0].audio)
  
     setpart(
      'PartOfSpeech : ' + meaningdata[0].meanings[0].partOfSpeech
     )
    
     
     } catch (error) {
      setComponent(true)
       alert('word not found or invalid data')
     }
   
  }



  

  return (
    <main className='my-9 justify-center py-10 items-center flex flex-col rounded overflow-x-hidden bg-slate-300 text-black font-bold'>
      <div className='my-3 space-x-3'>
      <input type="text" className=' border h-10 w-60' id='input' placeholder='enter a word' onChange={(e)=> inputdata(e)}/>
      <button className='text-white' onClick={() =>{fectchdata()}}>Search</button>
      </div>
       <div>
        <audio src={soundv} id='sound'  controls hidden></audio>
       </div>
      <div className='h-80-auto bg-slate-200 center flex flex-col place-items-center w-96 rounded '>
        
      <div className='bg-slate-200 py-4  flex justify-center space-x-60 rounded mx-12 h-10'>
       <p className='text-[#7d3e0fd2]'>{data.toUpperCase()}</p> 
        <span className='text-[#7d3e0fd2]'>{sound} </span>
      </div>
        <div className='text-left space-y-2 my-3 w-full px-7'>
          <h4 className='text-[#7d3e0fd2]'><i>{explainn}</i></h4>
          {component && <AdvancedAutoBook/>}
          <p className='bg-slate-300 px-3 border-l-4'>{explain}</p>
          <i>{example}</i>

        </div>
        <div className='text-left space-y-2 my-3 w-full px-7'> 
         <p className='bg-slate-300 px-3 border-l-4'>{part}</p>
          <p className='bg-slate-300 px-3 overflow-auto'> {synonyms}</p>
        </div>
        </div>
    </main>
    
  )
}

export default App
