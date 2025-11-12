
import type { GiphyResponse } from "../interfaces/giphy.response"
import type { Gif } from "../interfaces/gif.interface"
import { giphyApi } from "../api/giphy.api"


export const getGifsByQuery = async (query: string): Promise<Gif[]> => {

  const response = await giphyApi<GiphyResponse>('/search', {
    params: {
      q: query,
      limit: 10,
    }
  })



  return response.data.data.map((gif) => ({
    id: gif.id,
    title: gif.title,
    url: gif.images.original.url,
    width: Number(gif.images.original.width),
    height: Number(gif.images.original.height)
  }))
  //fetch(`https://api.giphy.com/v1/gifs/search?api_key=1ftcyJWeDCEGNPnet1WmAGstj49AYDGM&q=${query}&limit=10&lang=es`)
}