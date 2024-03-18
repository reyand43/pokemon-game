import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GamePage } from './pages/GamePage/GamePage';
import { HomePage } from './pages/HomePage/HomePage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SelectPokemonPage } from './pages/SelectPokemonPage/SelectPokemonPage';
import { GameRoutes } from './routes/GameRoutes';
import { GameContextProvider } from './contexts/GameContext';

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <GameContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GameRoutes />} >
              <Route path="/" element={<HomePage />} />
              <Route path="/select-pokemon" element={<SelectPokemonPage />} />
              <Route path="/game" element={<GamePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GameContextProvider>
    </QueryClientProvider>
  );
}

export default App;
