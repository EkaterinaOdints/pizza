import "./app.css";
import { ContextProvider } from "@/components/context/context";
import { Toaster } from "@/components/ui/toaster";
import { Modal } from "@/components/ui/Modal";
import { Box } from "@chakra-ui/react";
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Catalog from "@/components/layout/Catalog";
import Cart from "@/components/layout/Cart";


const App = () => {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Box as="main">
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Box>
        <Modal.Viewport />
        <Toaster />
      </ContextProvider>
    </BrowserRouter>
  )
}

export default App;