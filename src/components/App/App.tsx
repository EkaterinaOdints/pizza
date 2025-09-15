import "./app.css";
import { ContextProvider } from "@/components/context/context";
import { Toaster } from "@/components/ui/toaster";
import { Modal } from "@/components/ui/Modal";
import { Box } from "@chakra-ui/react";
import {
  HashRouter,
  Routes,
  Route
} from 'react-router-dom';

import { ROUTES } from "@/constants/constants";

import Catalog from "@/components/layout/Catalog";
import Cart from "@/components/layout/Cart";


const App = () => {
  return (
    <HashRouter>
      <ContextProvider>
        <Box as="main">
          <Routes>
            <Route path={ROUTES.HOME} element={<Catalog />} />
            <Route path={ROUTES.CART} element={<Cart />} />
          </Routes>
        </Box>
        <Modal.Viewport />
        <Toaster />
      </ContextProvider>
    </HashRouter>
  )
}

export default App;