import { ConnectKitButton } from 'connectkit'
import { Web3Provider } from './abis/providers/Web3Provider'
import './App.css'
import { Examples } from './Examples'

function App() {


  return (
      <Web3Provider>

        <ConnectKitButton />
        <Examples/>

      </Web3Provider>
  )
}

export default App
