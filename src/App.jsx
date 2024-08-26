import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"


function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowMModal] = useState(false)
  function handleToggleModal(){
    setShowMModal(!showModal)
  }
  useEffect(()=>{
    const nasaApi = import.meta.env.VITE_NASA_API_KEY
    //console.log("API", nasaApi)
    async function fetchData(){
      const url = 'https://api.nasa.gov/planetary/apod/' + `?api_key=${nasaApi}`
      try{
        const res = await fetch(url)
        const apiData = await res.json()
        setData(apiData)
        console.log('Data', apiData)
      }catch(err){
        console.log(err.message)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      {data ? (<Main data = {data} />): (
        <div className = "loadingState">
            <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (
        <SideBar data = {data} handleToggleModal = {handleToggleModal}/>
        )}
      {data &&  (
        <Footer data = {data} showModal = {showModal} handleToggleModal = {handleToggleModal}/>
        )}
      
      
    </>
  )
}

export default App
