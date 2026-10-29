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

// TODOS:
// TODO: Clase 10, hacer un crud de cupones de descuento
/* CLASE 10

Requerimientos funcionales:

1. Creación de cupones:
○ El usuario debe poder crear un nuevo cupón de descuento.
○ Se debe implementar un formulario que capture dos datos: el código del
cupón (texto) y el porcentaje de descuento (numérico).
○ Al enviar el formulario, la información debe persistir como un nuevo
documento en la colección cupones de Firestore.

2. Visualización de cupones:
○ Se debe mostrar en pantalla una lista con todos los cupones de descuento
almacenados en la base de datos.
○ Por cada cupón, se deben visualizar su código y el porcentaje de descuento
asociado.

3. Eliminación de cupones:
○ Cada cupón listado debe contar con una opción (ej: un botón) para ser
eliminado.
○ Al accionar dicha opción, el documento correspondiente debe ser borrado de
la colección en Firestore y la lista en la interfaz debe actualizarse en tiempo
real para reflejar el cambio.


Requerimientos técnicos:
1. Componente específico: Toda la lógica debe estar encapsulada en un nuevo
componente denominado GestionCupones.jsx.
2. Base de datos: Se utilizará una colección en Firestore llamada cupones.
3. Operaciones CRUD:
○ Para la creación, se deberá utilizar la función addDoc de la librería de
Firebase.
○ Para la eliminación, se deberán utilizar las funciones doc y deleteDoc.
4. Navegación:
○ Se debe crear una nueva ruta estática en la aplicación (ej: /admin/cupones)
que renderice el componente GestionCupones.jsx.

○ Se debe agregar un enlace en el componente NavBar para permitir el acceso
a esta nueva ruta de administración.
* */

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
