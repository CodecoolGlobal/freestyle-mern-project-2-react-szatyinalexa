

function Card({cat, width, height, backOfImage, onClick, selected, stopFlip}){

    return(
        <div className="container" style={{width: `${width}px`, height: `${height}px`}} > 
        <div className={selected ? "selected" : ""}>
        <div className="card">
       
        <img className="front" src={cat.img} width={width} height={height}></img>
      
        </div>

        <div className="card">
      
        <img className="back" onClick={() => !stopFlip && onClick(cat)} src={backOfImage} width={width} height={height}></img>
    
        </div>
        </div>
        </div>
        
    )
}

export default Card