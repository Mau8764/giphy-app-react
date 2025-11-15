import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { useGifs } from "./gifs/hooks/useGifs";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";

export const GifsApp = () => {
  const { gifs, previousTerms, handleSearch, handleTermClicked } = useGifs()

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


