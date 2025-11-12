import { useState } from "react";


import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";


import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.actions";
import type { Gif } from "./gifs/interfaces/gif.interface";


export const GifsApp = () => {
  const [gifs, setGifs] = useState<Gif[]>([])
  const [previousTerms, setpreviousTerms] = useState(['dragon ball z'])

  const handleTermClicked = (term:string) => {
    console.log({term})
  }

  const handleSearch = async (query: string) => {
    query.trim().toLowerCase()
    if(query.length === 0) return;
    if(previousTerms.includes(query)) return;

    setpreviousTerms([query, ...previousTerms].splice(0,7))


    const gifs = await getGifsByQuery(query)
    setGifs(gifs)

  }

  return (
    <>
      { /* Header */ }
      <CustomHeader title="Buscador de gifs" description="Descubre y comparte el gif perfecto"/>

      { /* Search */ }
      <SearchBar placeholder="Buscar gifs" onQuery={handleSearch}/>

      { /* Previous searches */ }
      <PreviousSearches searches={previousTerms} onLabelClicked={(term: string)=>{handleTermClicked(term)}} />

      { /* Gifs */ }
      <GifList gifs={gifs} />
    </>
  );
}


