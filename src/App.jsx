import {Layout} from "./componentes/Layout/Layout.jsx";
import {ItemListContainer} from "./componentes/ItemListContainer/ItemListContainer.jsx";
import './App.css'
import './bootstrap.min.css';
import {FormularioContainer} from "./componentes/FormularioContainer/FormularioContainer.jsx";
import {Route, Routes} from "react-router-dom";
import Productos from "./componentes/Productos/Productos.jsx";

function App() {

  return (
      <div className="container">
          <Routes>{/*envuelve a las demás para mostrar Header y Footer siempre */}
              <Route element={<Layout/>}>
                  <Route path="/" element={<h1>Página de Inicio</h1>} />
                  <Route path="/productos" element={<ItemListContainer Mensaje={"Productos destacados"}/>} />
                  <Route path="/destacados" element={<Productos Mensaje={"Todos los productos"}/>} />
                  <Route path="/carrito" element={<p>TODO: CARRITO!</p>}/>
                  <Route path="/alta" element={<FormularioContainer/>} />
              </Route>
          </Routes>);
      </div>
  );

}

export default App;
