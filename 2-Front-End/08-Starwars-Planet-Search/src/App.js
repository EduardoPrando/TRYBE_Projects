import React from 'react';
import Header from './Components/Header/Index';
import ContextProvider from './context/ContextProvider';
import Table from './Components/Table/Index';

function App() {
  return (
    <ContextProvider>
      <Header className="Header" />
      <Table />
    </ContextProvider>
  );
}

export default App;
