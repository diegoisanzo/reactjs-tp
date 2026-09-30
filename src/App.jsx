import {Layout} from "./componentes/Layout/Layout.jsx";
import Contador from "./componentes/Contador/Contador.jsx";
import {ItemListContainer} from "./componentes/ItemListContainer/ItemListContainer.jsx";
import './App.css'
import Productos from "./componentes/Productos/Productos.jsx";

function App() {

  return (
      <div>
          <Layout>
              <h1>¡Bienvenidos a mi página!</h1>
              <p>Este es el contenido principal.</p>
              <ItemListContainer Mensaje="Estos son nuestros productos"/>
              <Contador/>
              <Productos/>
          </Layout>
      </div>
  );

}

export default App
