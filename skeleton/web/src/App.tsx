import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from './contexts/ConfigContext';
import Home from './pages/Home';
import AgentDetail from './pages/AgentDetail';

function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agent/:agentId" element={<AgentDetail />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
