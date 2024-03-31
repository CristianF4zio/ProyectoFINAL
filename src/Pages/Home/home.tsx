import { useState } from 'react';
import './home.css'
import agrupacion from '../../assets/agrupacion.jpg'

export function Home() {
  const urls = [
    'https://www.unimet.edu.ve/wp-content/uploads/2023/12/FOTOS-CAMPUS-2023-24-1-980x653.jpg',
    "https://www.unimet.edu.ve/wp-content/uploads/2023/09/sin-titulo-1-5.jpg",
    "https://ceovenezuela.com/wp-content/uploads/2021/04/CEOVenezuela-UNIMET-aprueba-creacion-de-programa-de-asistencia-temporal-para-estudiantes-FOTO-800x445.jpg",
    "https://ceovenezuela.com/wp-content/uploads/2021/06/Unimet1.jpg"
    // Agrega más URLs de imágenes aquí según sea necesario
  ];

  // Estado para almacenar el índice de la imagen actual
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para cambiar a la siguiente imagen
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === urls.length - 1 ? 0 : prevIndex + 1));
  };

  // Función para cambiar a la imagen anterior
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? urls.length - 1 : prevIndex - 1));
  };

  return (
    <div className="section-one">
      <div className="hero min-h-screen" style={{ backgroundImage: `url(${urls[currentIndex]})` }}>
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="bienvenidos">Bienvenidos</h1>
            <p className="p">Explora nuestra plataforma de agrupaciones, donde cada grupo es una historia por descubrir, un viaje por emprender y una familia por construir, en un espacio de inclusión y celebración de la diversidad.</p>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <button className="btn btn-circle" onClick={prevImage}>❮</button>
            <button className="btn btn-circle" onClick={nextImage}>❯</button>
          </div>
        </div>
      </div>



        <div className='section-two'>
          <img src={agrupacion} className='image' alt="" />
        <div className='info'>
          <h2>Quienes somos?</h2>
          <p >Somos un grupo diverso de estudiantes comprometidos con el crecimiento personal y colectivo. En nuestra comunidad, fomentamos el liderazgo, la colaboración y el servicio. Nos esforzamos por promover un ambiente inclusivo donde cada voz tenga el poder de generar un cambio positivo. ¡Únete a nosotros para hacer una diferencia en nuestra universidad y más allá!
          </p>
        </div>


      </div>


      <div className="section-three">

        <div className="tarjeta">
          <h2 className="card-title">Misión</h2>
          <p>Proporcionar un centro integral de información, comunicación y participación para los miembros de la comunidad universitaria. Buscando un impacto positivo y duradero en la vida estudiantil. A través de eventos, recursos y colaboraciones, se espera promover la inclusión, y contribuir al desarrollo integral de una comunidad, permitiendo el desarrollo de sus habilidades, intereses y competencias, enriqueciendo su experiencia universitaria.
          </p>
        </div>

        <div className="tarjeta">
          <h2 className="card-title">Objetivo</h2>
          <p>Desarrollar una plataforma web para gestionar Agrupaciones Estudiantiles dentro de la Universidad Metropolitana. Mejorar la experiencia al facilitar la participación y contribución de los estudiantes en grupos afines a sus intereses y preferencias.
          </p>
        </div>



        <div className="tarjeta">
          <h2 className="card-title">Vision</h2>
          <p>Establecer una comunidad entre las diferentes agrupaciones, promoviendo el intercambio de ideas, recursos y eventos, para enriquecer la experiencia estudiantil y fortalecer la comunidad social dentro de la institución. Queremos que la página web sea el punto de encuentro virtual donde las agrupaciones encuentren inspiración, apoyo mutuo y oportunidades para impactar positivamente en la vida estudiantil y más allá.
          </p>
        </div>



      </div>
    </div >
  );
}




//     <button className="btn" onClick={()=>{
//         const modal = document.getElementById('my_modal_5') as HTMLDialogElement;
//         if(modal) modal.showModal();
//       }}>open modal</button>
// <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
// <div className="modal-box">
//   <h3 className="font-bold text-lg">Hello!</h3>
//   <p className="py-4">Press ESC key or click the button below to close</p>
//   <div className="modal-action">
//     <form method="dialog">
//       {/* if there is a button in form, it will close the modal */}
//       <button className="btn">Close</button>
//     </form>
//   </div>
// </div>
// </dialog>