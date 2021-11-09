
const Opera = ({ content }) => {       
    const numb=(content.map(tot => Number(tot.exercises)))  
    let tot = 0;
    tot =  numb.reduce((result,number)=> result+number);
   return ( 
    <div>
       <p> Total of {tot} exercises </p>
    </div>

   )  
}

export default Opera