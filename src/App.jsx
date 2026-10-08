import {Layout} from "./componentes/Layout/Layout.jsx";
import {ItemListContainer} from "./componentes/ItemListContainer/ItemListContainer.jsx";
import './App.css'
import './bootstrap.min.css';
import {FormularioContainer} from "./componentes/FormularioContainer/FormularioContainer.jsx";
import {Route, Routes} from "react-router-dom";
import Productos from "./componentes/Productos/Productos.jsx";
import ProductoDetalle from "./componentes/Productos/ProductoDetalle/ProductoDetalle.jsx";
import Inicio from "./componentes/Inicio/Inicio.jsx";
import Cart from "./componentes/Cart/Cart.jsx";

function App() {

  return (
      <div className="container">
          <Routes>{/*envuelve a las demás para mostrar Header y Footer siempre */}
              <Route element={<Layout/>}>
                  <Route path="/" element={<Inicio/>} />
                  <Route path="/productos" element={<ItemListContainer Mensaje={"Todos los productos"}/>} />
                  <Route path="/destacados" element={<Productos Mensaje={"Productos destacados"}/>} />
                  <Route path="/alta" element={<FormularioContainer/>} />
                  <Route path="/producto/:id" element={<ProductoDetalle />} />
                  <Route path="/carrito" element={<Cart />} />
              </Route>
          </Routes>);
      </div>
  );

}

export default App;
