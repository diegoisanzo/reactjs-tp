import {Layout} from "./componentes/Layout/Layout.jsx";
import {ItemListContainer} from "./componentes/ItemListContainer/ItemListContainer.jsx";
import './App.css'

function App() {

  return (
      <div>
          <Layout>
              <h1>¡Bienvenidos a mi página!</h1>
              <p>Este es el contenido principal.</p>
              <ItemListContainer Mensaje="Estos son nuestros productos"/>
          </Layout>
      </div>
  );

}

export default App
