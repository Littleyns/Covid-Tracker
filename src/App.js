import React,{useState,useEffect,} from 'react'
import './App.css';
import {MenuItem,FormControl,Select,Card,CardContent,} from "@material-ui/core";
import InfoBox from './InfoBox'
import Map from './Map'
function App() {
  const [countries,setCountries]= useState(['USA','UK','INDIA']);
  const [country,setCountry]=useState('worldwide')
  const [countryInfo,setCountryInfo]=useState({});
  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all").then(response=>response.json())
    .then(data =>{
      setCountryInfo(data)
    })
  },[])
  useEffect(()=>{
    const getCountriesData = async () =>{
      await fetch ('https://disease.sh/v3/covid-19/countries').then(response=>response.json())
      .then(data=>{
        const countries = data.map(country=>(
          {
            name:country.country,
            value:country.countryInfo.iso2
          }
        ));
          setCountries(countries)
      })
      }
      getCountriesData();
  },[]);
  const onCountryChange = async (e) =>{
  let countryCode = e.target.value
    const url = countryCode === 'worldwide' ? `https://disease.sh/v3/covid-19/all`  : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url).then(response=>response.json())
    .then(data=>{
      setCountry(countryCode)
      setCountryInfo(data);
      
    })
    
  };
  return (
    <div className="app">
      <div className="app__left">
    <div className="app__header">
    <h1>Covid-19 Tracker</h1>
    <FormControl className="app__dropdown">
      
      <Select Variant="outlined"
       onChange={onCountryChange} value={country}>
        <MenuItem value="worldwide">worldwide</MenuItem>
      {countries.map(m=>(<MenuItem value={m.value}>{m.name}</MenuItem>))}
      </Select>

    </FormControl>
    </div>
    <div className="app__stats">
    <InfoBox title="Coronavirus Cases" total={countryInfo.cases} cases={countryInfo.todayCases}/>
    <InfoBox title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered}/>
    <InfoBox title="Deaths" total={countryInfo.deaths} cases={countryInfo.todayDeaths}/>
    </div>
    <Map/>
    </div>
    <Card className="app__right">
    <CardContent>
<h3>Nombre de cas par pays ( live )</h3>
    </CardContent>
    </Card>
    </div>
  );
}

export default App;
