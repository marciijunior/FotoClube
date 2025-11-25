// src/pages/PhotoDetailsPage/PhotoDetailsPage.jsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { slidesData } from '../../data/slidesData';
import { FaCamera, FaArrowLeft } from 'react-icons/fa';
import './PhotoDetailsPage.css';

function PhotoDetailsPage() {
  // Pega o ID da URL
  const { id } = useParams();
  
  // Encontra a foto correspondente nos dados
  const photo = slidesData.find(item => item.id === Number(id));

  // Rola para o topo ao abrir
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!photo) {
    return (
      <div style={{ color: 'black', padding: '100px', textAlign: 'center' }}>
        <h2>Foto não encontrada</h2>
        <Link to="/">Voltar para Home</Link>
      </div>
    );
  }

  return (
    <div className="photo-details-container">
      <div className="photo-details-grid">
        
        {/* Lado Esquerdo: Imagem */}
        <div className="photo-details-image-col">
          <img src={photo.image} alt={photo.title} />
        </div>

        {/* Lado Direito: Informações */}
        <div className="photo-details-info-col">
          
          <div>
            <span className="details-location">{photo.location}</span>
            <h1 className="details-title">{photo.title}</h1>
            <p className="details-author">{photo.author}</p>

            <div className="details-description-box">
              <p className="details-description">
                {photo.description || "Sem descrição disponível para esta imagem."}
              </p>
            </div>
          </div>

          {/* Detalhes Técnicos */}
          {photo.technical && (
            <div className="technical-grid">
              <div className="tech-item">
                <h4><FaCamera /> Câmera</h4>
                <p>{photo.technical.camera}</p>
              </div>
              <div className="tech-item">
                <h4>Lente</h4>
                <p>{photo.technical.lens}</p>
              </div>
              <div className="tech-item">
                <h4>ISO</h4>
                <p>{photo.technical.iso}</p>
              </div>
              <div className="tech-item">
                <h4>Abertura</h4>
                <p>{photo.technical.aperture}</p>
              </div>
            </div>
          )}

          <Link to="/" className="back-button">
            <FaArrowLeft style={{ marginRight: '8px' }} /> Voltar
          </Link>

        </div>
      </div>
    </div>
  );
}

export default PhotoDetailsPage;