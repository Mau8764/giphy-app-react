import { useRef, useState } from "react"

import type { Gif } from "../interfaces/gif.interface"
import { getGifsByQuery } from "../actions/get-gifs-by-query.actions"


export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([])
  const [previousTerms, setpreviousTerms] = useState(['dragon ball z'])
  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleTermClicked = async (term: string) => {
    if (gifsCache.current[term]){
      setGifs(gifsCache.current[term])
      return
    }


    const gifs = await getGifsByQuery(term)
    setGifs(gifs)
  }

  const handleSearch = async (query: string) => {
    query.trim().toLowerCase()
    if(query.length === 0) return;
    if(previousTerms.includes(query)) return;

    setpreviousTerms([query, ...previousTerms].splice(0,7))

    const gifs = await getGifsByQuery(query)
    setGifs(gifs)

    gifsCache.current[query] = gifs
    console.log(gifsCache)
  }


  return {
    // Values
    gifs,
    previousTerms,

    // Actions
    handleSearch,
    handleTermClicked
  }
  ;
}
