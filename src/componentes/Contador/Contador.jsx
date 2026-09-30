import {useEffect, useState} from 'react';

function Contador() {
    const [contador, setContador] = useState(0);

    useEffect(() => {
        console.log("¡El componente se renderizó o el contador cambió!");
    }, [contador]);

    return (
        <div style={{ margin: '20px', padding: '20px', border: '1px solid black'
        }}>
            <h3>Contador de Ejemplo</h3>
            <p>Valor actual: {contador}</p>
            <button onClick={() => setContador(contador + 1)}>+1</button>
            <button onClick={() => setContador(contador - 1)}>-1</button>
        </div>
    );
}

export default Contador;