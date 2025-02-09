import { useEffect, useState } from "react";
import { ClockIcon, SearchIcon } from "../assets/icons/svg/Icons";

const GoogleSearchLikeFeature = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsCache, setSearchResultsCache] = useState({});
  const [inFocus, setInFocus] = useState(false);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    // console.log(searchTerm);
  };

  const fetchFromBe = async () => {
    const toSearch = searchTerm.trim();
    let result = [];

    if (searchResultsCache[toSearch]) result = searchResultsCache[toSearch];
    else {
      console.log("API Call", toSearch);
      result = await fetch(
        `https://dummyjson.com/recipes/search?q=${toSearch}`
      );
      result = await result.json();
      result = result.recipes
    }

    setSearchResultsCache({ ...searchResultsCache, [toSearch]: result });
    setSearchResults(result);
  };

  useEffect(() => {
    // console.log("Component mounted...");
    // fetchFromBe()

    const timer = setTimeout(() => {
      fetchFromBe();
    }, 400);

    return () => {
      clearTimeout(timer);
      //   console.log("Component unmounting...");
    };
  }, [searchTerm]);

  return (
    <div className="main w-[80%] lg:w-[45%]">
      <div className="search-container">
        <SearchIcon className="text-gray-500" />
        <input
          onFocus={() => setInFocus(true)}
          onBlur={() => setInFocus(false)}
          value={searchTerm}
          onChange={(e) => handleInputChange(e)}
          className="search-input"
          type="text"
          placeholder="Search..."
        />
      </div>

      {inFocus && searchResults.length > 0 && (
        <div className="results-container">
          {searchResults.map((rec) => {
            return (
              <div key={rec.id} className="rec-item-container">
                <ClockIcon />
                <div className="rec-item"> {rec.name} </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GoogleSearchLikeFeature;
