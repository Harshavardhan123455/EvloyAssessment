import React, { useState } from 'react';
import './SearchVolumeApp.css'; 

const key = 'AIzaSyACHFB-LbDtBJOSqbcDIOPiXRt9AAkuHYE'; 

function Search() {
  const [V1, setV1] = useState('');
  const [V2, setV2] = useState(null);
  const [V3, setV3] = useState(null);
  const [V4, setV4] = useState(null);

  const Volume = async () => {
    try {
      const currentDate = new Date();
      const lastYearDate = new Date();
      lastYearDate.setFullYear(currentDate.getFullYear() - 1);

      const TodayDateIso = currentDate.toISOString().split('T')[0];
      const LastYearDateIso = lastYearDate.toISOString().split('T')[0];

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=id&q=${V1}&publishedAfter=${LastYearDateIso}T00:00:00Z&publishedBefore=${TodayDateIso}T23:59:59Z&key=${key}`
      );

      const data = await response.json();
      const total = data.pageInfo.totalResults;

      const days= Math.floor((currentDate - lastYearDate) / (24 * 60 * 60 * 1000)) + 1;
      const Yearly = total / days;
      console.log(days)
      const month = total/12

      setV2(total);
      setV3(Yearly);
      setV4(month)

    } catch (error) {
      console.error('Error fetching search volume:', error);
    }
  };

  return (
    <div className="volumeCss">
      <h1>Keyword Search Checker</h1>
      <input
        type="text"
        placeholder="Enter the keyword"
        value={V1}
        onChange={(e) => setV1(e.target.value)}
      />
      <button onClick={Volume}>Click</button>
      {V2 !== null && (
        <div>
          <p>
          Keyword : "{V1}" 
        </p>
        <p>
          Count : "{V2}"
        </p>
        <p>
          EveryYear : "{V2}"
        </p>
        <p>
          EveryMonth : "{V4}"
        </p>
        <p>
          EveryDay : "{V3}"
        </p>
        </div>
       
      )}
    </div>
  );
}
export default Search;