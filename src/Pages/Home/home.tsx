import { useState } from 'react';
import './home.css'
import { urls } from '../../constants/url';
export function Home() {


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
    <div className="flex flex-col w-full">
      <div className="hero min-h-screen" style={{ backgroundImage: `url(${urls[currentIndex]})` }}>
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl text-white font-bold ">Bienvenidos</h1>
            <p className="mb-5 text-white text-2xl">Explora nuestra plataforma de agrupaciones, donde cada grupo es una historia por descubrir, un viaje por emprender y una familia por construir, en un espacio de inclusión y celebración de la diversidad.</p>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <button className="btn btn-circle" onClick={prevImage}>❮</button>
            <button className="btn btn-circle" onClick={nextImage}>❯</button>
          </div>
        </div>
      </div>

      <div>
        <div className="hero  bg-white">
          <div className="hero-content flex-col  lg:flex-row">
            <img src="https://i.ibb.co/Vj4pdbj/pngwing-com.png" className="max-w-sm rounded-lg " />

            <div className='text-black    '>
              <h1 className="font-900  text-5xl">Quienes somos?</h1>
              <div className=' w-96 '>
                <p className="py-6 text-2xl">Somos un grupo diverso de estudiantes comprometidos con el crecimiento personal y colectivo. En nuestra comunidad, fomentamos el liderazgo, la colaboración y el servicio. Nos esforzamos por promover un ambiente inclusivo donde cada voz tenga el poder de generar un cambio positivo. ¡Únete a nosotros para hacer una diferencia en nuestra universidad y más allá!

                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-center gap-9 mt-10'>
        <div className="card w-96 bg-orange shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-5xl">Obejetivo</h2>
            <p className='text-2xl'>Desarrollar una plataforma web para gestionar Agrupaciones Estudiantiles dentro de la Universidad Metropolitana. Mejorar la experiencia al facilitar la participación y contribución de los estudiantes en grupos afines a sus intereses y preferencias.
            </p>
            <div className="card-actions justify-end">


            </div>
          </div>
        </div>

        <div className="card w-96 bg-orange shadow-xl ">
          <div className="card-body">
            <h2 className="card-title text-5xl">Misión</h2>
            <p className='text-2xl'>Proporcionar un centro integral de información, comunicación y participación para los miembros de la comunidad universitaria. Buscando un impacto positivo y duradero en la vida estudiantil. A través de eventos, recursos y colaboraciones, se espera promover la inclusión, y contribuir al desarrollo integral de una comunidad, permitiendo el desarrollo de sus habilidades, intereses y competencias, enriqueciendo su experiencia universitaria.
            </p>
            <div className="card-actions justify-end">

            </div>
          </div>
        </div>

        <div className="card w-96 bg-orange shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-5xl">Misión</h2>
            <p className='text-2xl'>Proporcionar un centro integral de información, comunicación y participación para los miembros de la comunidad universitaria. Buscando un impacto positivo y duradero en la vida estudiantil. A través de eventos, recursos y colaboraciones, se espera promover la inclusión, y contribuir al desarrollo integral de una comunidad, permitiendo el desarrollo de sus habilidades, intereses y competencias, enriqueciendo su experiencia universitaria.
            </p>
            <div className="card-actions justify-end">

            </div>
          </div>
        </div>

      </div>
    </div>
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