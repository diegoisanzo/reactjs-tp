import {Layout} from "./componentes/Layout/Layout.jsx";
import {ItemListContainer} from "./componentes/ItemListContainer/ItemListContainer.jsx";
import './bootstrap.min.css';
import './App.css'
import {Route, Routes} from "react-router-dom";
import Productos from "./componentes/Productos/Productos.jsx";
import ProductoDetalle from "./componentes/Productos/ProductoDetalle/ProductoDetalle.jsx";
import Inicio from "./componentes/Inicio/Inicio.jsx";
import Cart from "./componentes/Cart/Cart.jsx";
import Gestion from "./componentes/Gestion/Gestion.jsx";
import GestionCupones from "./componentes/GestionCupones/GestionCupones.jsx";
import NoEncontrado from "./componentes/NoEncontrado/NoEncontrado.jsx";
import Nosotros from "./componentes/Nosotros/Nosotros.jsx";

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

/* CLASE 11
Completar el CRUD - Edición y Validación
Requerimientos funcionales:
1. Habilitar modo edición:
○ El usuario debe poder iniciar la edición de un producto existente directamente
desde la lista de productos.
○ Al entrar en modo edición, el formulario debe cargarse automáticamente
con los datos (nombre, precio, etc.) del producto seleccionado.
2. Interfaz de usuario adaptativa:
○ El formulario debe indicar visualmente si se está creando un nuevo
producto o editando uno existente. Esto incluye cambiar, como mínimo, el
título del formulario y el texto del botón de envío (ej: "Agregar Producto" vs.
"Actualizar Producto").
3. Lógica de actualización:
○ Al enviar el formulario en modo edición, los datos del producto
correspondiente en la base de datos de Firestore deben ser actualizados
con la nueva información ingresada. La acción de creación no debe
ejecutarse en este caso.
4. Validación de datos:
○ El sistema no debe permitir la creación o actualización de un producto si no
se cumplen las siguientes condiciones:
■ El campo nombre no puede estar vacío.
■ El campo precio debe ser un valor numérico y mayor que cero.
○ Si la validación falla, se debe notificar al usuario mediante una alerta (alert) y
prevenir el envío de datos a Firebase.
Requerimientos Técnicos:
1. Manejo de estado para edición:
○ Se debe utilizar un estado (ej: productoAEditar) inicializado en null para
almacenar el objeto del producto que se está editando.
○ Cada producto en la lista debe tener un botón "Editar" que, al ser presionado,
actualice este estado con los datos del producto correspondiente.
2. Sincronización de formulario y estado:
○ Implementar un useEffect que observe los cambios en el estado
productoAEditar. Cuando este estado contenga un producto, sus datos
deberán ser asignados a los estados que controlan los campos del
formulario.
3. Lógica condicional en onSubmit:
○ La función que maneja el envío del formulario debe verificar el estado
productoAEditar.
■ Si es null, debe ejecutar la lógica de creación con addDoc.■ Si contiene un producto, debe ejecutar la lógica de actualización con
updateDoc, utilizando el ID del producto para modificar el documento
correcto.
 */

/* TODOS (sugerencias de Jorge):
- Mejorar el abm/crud viendo de usar column-span
 ( https://www-w3schools-com.translate.goog/cssref/css3_pr_column-span.php?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc )
- ver de usar display: flex
 */

function App() {

  return (
      <div className="container">
          <Routes>{/*envuelve a las demás para mostrar Header y Footer siempre */}
              <Route element={<Layout/>}>
                  <Route path="/" element={<Inicio/>} />
                  <Route path="/productos" element={<ItemListContainer mensaje={"Todos los productos"}/>} />
                  <Route path="/destacados" element={<Productos mensaje={"Productos destacados"}/>} />
                  <Route path="/producto/:id" element={<ProductoDetalle />} />
                  <Route path="/carrito" element={<Cart />} />
                  <Route path="/nosotros" element={<Nosotros />} />

                  <Route path="/gestion" element={<Gestion />} />
                  <Route path="/gestion-cupones" element={<GestionCupones />} />

                  <Route path="*" element={<NoEncontrado />} />
              </Route>
          </Routes>
      </div>
  );

}

export default App;
