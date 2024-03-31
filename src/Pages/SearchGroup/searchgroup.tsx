import { SetStateAction, useState } from "react";
import "./searchgroup.css"; // Asegúrate de importar el archivo CSS

export function GroupSearch() {
    const [query, setQuery] = useState('');
    const [resultados] = useState<any[]>([]);

    const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setQuery(event.target.value);
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // const gruposEncontrados = await buscarGruposPorPalabras(query);
        // setResultados(gruposEncontrados);
    };

    return (
        <div className="group-search-container">
            <form className="group-search-form" onSubmit={handleSubmit}>
                <input
                    className="group-search-input"
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Buscar grupos por nombre o descripción"
                />
                <button className="group-search-button" type="submit">Buscar</button>
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
