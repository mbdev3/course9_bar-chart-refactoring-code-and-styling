import  {
  useState,
 
  useEffect,
} from 'react';
import {
  csv,
 
} from 'd3';
const csvUrl ='https://gist.githubusercontent.com/mbdev3/5afb40dbdcd3d75d69dd38b9d61bbb11/raw/3b771570b7278d39e8c6c54148a2ac602019e09b/wpp2020.csv';

export const useData = ()=>{
const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d.population = +d['2020'] *1000;
      return d;
    };
    csv(csvUrl, row).then((data) => {
      setData(data.slice(0, 10));
    });
  }, []);
return data
}