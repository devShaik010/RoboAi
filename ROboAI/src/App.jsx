import './App.css'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'
import { ImageProvider } from './components/ImageProvider';

function App() {
  return (
    <ImageProvider>
      <div className="flex h-screen">
        <Dashboard />
        <Sidebar />
      </div>
    </ImageProvider>
  )
}

export default App
