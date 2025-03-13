// App.tsx
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/help-guide/layout/Layout";

function App(){
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/docs/:docName" element={<Layout />} />
          <Route path="/" element={<Layout />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
