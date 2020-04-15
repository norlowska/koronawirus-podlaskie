import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ButtonsGroup.scss';

const ButtonsGroup = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  return (
    <div>
      <div className='buttons-container d-flex'>
        <div
          className='fb-share-button'
          data-href='https://koronawirus-podlaskie.pl'
          data-layout='button'
          data-size='large'
        >
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fkoronawirus-podlaskie.pl&amp;src=sdkpreparse'
            className='fb-xfbml-parse-ignore'
          >
            Udostępnij
          </a>
        </div>
        <Button onClick={() => setIsInfoModalOpen(true)}>O projekcie</Button>
        <a
          href='https://gov.pl/koronawirus'
          target='_blank'
          rel='noopener noreferrer'
          className='btn btn-primary'
        >
          Informacje i zalecenia
        </a>
      </div>
      <Modal
        size='lg'
        show={isInfoModalOpen}
        onHide={() => setIsInfoModalOpen(false)}
        className='info-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title>O projekcie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Dane wykorzystywane do utworzenia mapy pochodzą z komunikatów Podlaskiego Urzędu
            Wojewódzkiego udostępnianych na Facebooku. Pracujemy nad tym, by informacje na stronie
            były aktualizowane na bieżąco.
          </p>
          {/* <p>Logo pochodzi z Icons8</p> */}
          <p>
            Jeśli znajdziesz jakiś błąd lub chcesz zgłosić sugestię, napisz:
            <a href='mailto:kontakt@norlowska.com' className='contact-mail'>
              kontakt@norlowska.com
            </a>
          </p>
          <p>
            Kod źródłowy projektu:
            <a
              href='https://github.com/norlowska/koronawirus-podlaskie'
              target='_blank'
              rel='noopener noreferrer'
              className='repo-link'
            >
              https://github.com/norlowska/koronawirus-podlaskie
            </a>
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ButtonsGroup;
