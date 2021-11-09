import React from 'react'
import Content from './components/Content'
import Header from './components/Header'
import Course from './components/Course'
import Opera from './components/Opera'

const App = () => {
  return (
    <div>  
      <h1>Web development curriculum</h1>    
      {Object.values(Course).map (e =>    
        <>
          <Header key= {e.id} course= {e.name} />
          {e.parts.map(x =>  <Content key={x.id} name= {x.name} exercises= {x.exercises} /> )}
          <Opera content={e.parts} />          
        </>
      )}
    </div>
    )  
}
export default App

