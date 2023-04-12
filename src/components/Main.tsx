
interface pokemonDesc {
    img:string;
    tittle:string;
    type:string;
    description:string;
    pokemon:string;
}
const Main = ({img,tittle,pokemon,type,description}:pokemonDesc)=>{
    return(
        <main className='col-9 col-lg-5'>
        <div className="d-flex justify-content-between align-items-center flex-column Card p-3">
          <h1 className='text-center'>{tittle.slice(0, 1).toUpperCase() + tittle.slice(1)}</h1>
          <img src={img} alt={pokemon} />
          {type.split(' ').length > 1
            ? <div className='text-center'>
              <h3 className={`${type.split(' ')[0]} m-1`}>{type.split(' ')[0]}</h3>
              <h3 className={type.split(' ')[1]}>{type.split(' ')[1]}</h3>
            </div>
            : <div className='text-center'>
              <h3 className={type}>{type}</h3>
            </div>
          }

          <p className='overflow-auto '>{description}</p>
        </div>
      </main>
    )
}

export default Main