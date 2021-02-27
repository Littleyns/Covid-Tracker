import React,{useState,useEffect,} from 'react'
import './App.css';
import {MenuItem,FormControl,Select,Card,CardContent,} from "@material-ui/core";
import InfoBox from './InfoBox'
import Map from './Map'
function App() {
  const [countries,setCountries]= useState(['USA','UK','INDIA']);
  const [country,setCountry]=useState('worldwide')
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
  const onCountryChange = (e) =>{
    setCountry(e.target.value)
  }
  return (
    <div className="app">
      <div className="app__left">
    <div className="app__header">
    <h1>Covid-19 Tracker</h1>
    <FormControl className="app__dropdown">
      <Select Variant="outlined"
     value={country}  onChange={onCountryChange}>
        <MenuItem value="worldwide">Worldwide</MenuItem>
      {countries.map(m=>(<MenuItem value={m.value}>{m.name}</MenuItem>))}
      </Select>

    </FormControl>
    </div>
    <div className="app__stats">
    <InfoBox title="Coronavirus Cases" total={2000} cases={123}/>
    <InfoBox title="Coronavirus Cases" total={2000} cases={124}/>
    <InfoBox title="Coronavirus Cases" total={2000} cases={125}/>
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
