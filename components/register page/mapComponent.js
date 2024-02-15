import dynamic from 'next/dynamic'

function MapComponent() {
  const Map = dynamic(
    () => import('./map.js'),  
    { 
      loading: () => <div className='h-[40vh] w-full bg-neutral-100'></div>,
      ssr: false 
    }
  )
  return <Map className="h-[40vh] w-full"/>
}

export default MapComponent