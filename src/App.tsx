import './App.css'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { EntriesProps } from './types'
import AsideList from './components/AsideList'
import Main from './components/Main'
import AsidePercs from './components/AsidePercs'
import Footer from './components/Footer'
import Header from './components/Header'


function App() {
  const [pokemon, setPokemon] = useState('pikachu')
  const [tittle, setTittle] = useState('Pikachu')
  const [img, setImg] = useState('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png')
  const [type, setType] = useState('electric')
  const [description, setDescription] = useState('When several of these POKéMON gather, their electricity can build and cause lightning storms.')

  useEffect(() => {
    const abortController = new AbortController()

    fetchPokemon({ signal: abortController.signal })
      .then(data => {
        const { names, flavor_text_entries } = data
        const filtroPokemon = flavor_text_entries.filter((element: EntriesProps) => {
          return element.language.name === 'en'
        })
        setDescription(names[0].name + ' - ' + filtroPokemon[0].flavor_text)
      })

    return () => {
      abortController.abort()
    }
  }, [img])

  const fetchPokemon = async ({ signal }: RequestInit) => {
    return await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`, {
      signal
    }).then(response => response.json())
  }

  const searchInfoPokemon = async (names: string) => {
    const name = names.toLowerCase().trim()
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => response.json())
      .then(data => {
        const { sprites, types } = data

        setImg(sprites.other["official-artwork"].front_default);
        setType(types.length > 1
          ? `${types[0].type.name} ${types[1].type.name}`
          : `${types[0].type.name}`)
      }
      )
  }

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setTittle(pokemon)
    searchInfoPokemon(pokemon)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPokemon(e.target.value.toLowerCase().trim())

  }

  const handleClick = ({ ...props }) => {
    setPokemon(props.target.innerHTML.toLowerCase());
    setTittle(props.target.innerHTML.toLowerCase())
    searchInfoPokemon(props.target.innerHTML.toLowerCase())
  }

  return (
    <>
      <Header handleChange={handleChange} handleSubmit={handleSubmit} />
      <section className='d-flex flex-row-reverse justify-content-center col-12 content'>
        <AsideList handleClick={handleClick} />
        <Main tittle={tittle} pokemon={pokemon} img={img} type={type} description={description} />
        <AsidePercs />
      </section>
      <Footer />
    </>
  )
}
// moves.forEach((element:any) => {
//   const moveName:string = element.move.name
//   const moveAtLevel:number =  element.version_group_details[0].level_learned_at
//   if (element.version_group_details[0].level_learned_at > 0 && element.version_group_details[0].move_learn_method.name === 'level-up') {
//     obj.push([moveName,moveAtLevel])
//   }
// });

export default App
