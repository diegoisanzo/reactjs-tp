import {Layout} from "./componentes/Layout/Layout.jsx";
import {ItemListContainer} from "./componentes/ItemListContainer/ItemListContainer.jsx";
import './App.css'
import './bootstrap.min.css';

function App() {

  return (
      <div className="container">
          <Layout>
              <h1 className="h1">¡Bienvenidos a mi página!</h1>
              <p className="lead">Este es el contenido principal.</p>
              <ItemListContainer Mensaje="Estos son nuestros productos"/>
          </Layout>
      </div>
  );

}

export default App
