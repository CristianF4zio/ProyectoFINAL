import { SetStateAction, useState } from "react";
import "./Group.css"; // Importa los estilos CSS

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

    // Agrupaciones estudiantiles ficticias
    const agrupacionesEstudiantiles = [
        { id: 1, name: "Club de Debate", description: "Aprende a argumentar y debatir de manera efectiva." },
        { id: 2, name: "Sociedad de Música", description: "Únete a nosotros y participa en conciertos y eventos musicales." },
        { id: 3, name: "Equipo de Robótica", description: "Diseña y construye robots para competiciones emocionantes." },
        { id: 4, name: "Grupo de Teatro", description: "Explora tu lado creativo y actúa en producciones teatrales." },
        { id: 5, name: "Club de Fotografía", description: "Captura momentos memorables y mejora tus habilidades fotográficas." },
        { id: 6, name: "Asociación de Voluntariado", description: "Contribuye positivamente a la comunidad a través de proyectos de voluntariado." }
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="search-bar-container">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Buscar grupos por nombre o descripción"
                    style={{ width: "310px" }}
                    className="search-bar" // Aplica la clase search-bar
                />
                <button type="submit" onClick={handleSubmit} className="search-button">Buscar</button>
            </div>
            <div className="group-container"> {/* Agregado un contenedor para las tarjetas */}
                {agrupacionesEstudiantiles.map((grupo) => (
                    <div key={grupo.id} className="group-card">
                        <h3>{grupo.name}</h3>
                        <p className="group-description">{grupo.description}</p> {/* Aplica la clase group-description */}
                    </div>
                ))}
            </div>
        </div>
    );
}
