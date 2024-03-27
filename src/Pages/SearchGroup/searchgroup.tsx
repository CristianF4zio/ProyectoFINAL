import { SetStateAction, useState } from "react";
import {  buscarGruposPorPalabras } from "../../components/autent"

export function GroupSearch() {
    const [query, setQuery] = useState('');
    const [resultados, setResultados] = useState<any[]>([]);

    const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setQuery(event.target.value);
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const gruposEncontrados = await buscarGruposPorPalabras(query);
        setResultados(gruposEncontrados);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Buscar grupos por nombre o descripción"
                />
                <button type="submit">Buscar</button>
            </form>
            <ul>
                {resultados.map((grupo) => (
                    <li key={grupo.id}>
                        <h3>{grupo.name}</h3>
                        <p>{grupo.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
