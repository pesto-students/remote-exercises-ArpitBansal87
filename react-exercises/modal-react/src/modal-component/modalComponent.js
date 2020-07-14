import React, { useEffect, useCallback } from 'react';
import './modalComponent.css';

const focusableElementType = [
  'a[href]',
  'area[href]',
  'button',
  'details',
  'input',
  'iframe',
  'select',
  'textarea',
];

const keyCodes = {
  escape: 27,
  tab: 9,
  shift: 16,
};

function keepModalOpen(event) {
  let returnObj = false;
  event.target.classList.forEach((item) => {
    if (item === 'modal-outer-content') {
      returnObj = true;
    }
  });
  return returnObj;
}

function ModalComponent(props) {
  // default checks for style and other props
  let { onClose, title, children, showModal, size, style } = props;

  const handleModalClick = (event) => {
    if (keepModalOpen(event)) {
      onClose();
    }
  };

  const handleKeyPressEvent = useCallback(
    (event) => {
      if (event.keyCode === keyCodes.escape) {
        onClose();
      }
      if (event.keyCode === keyCodes.tab) {
        const modalElement = document.querySelector('.modal-outer-content');
        if (modalElement != null) {
          const elementList = modalElement.querySelectorAll(
            focusableElementType
          );
          if (elementList.length !== 0) {
            const currentActiveElement = document.activeElement;
            if ([...elementList].indexOf(currentActiveElement) === 0 && event.shiftKey ) {
              elementList[elementList.length - 1].focus()
              event.preventDefault();
            } if([...elementList].indexOf(currentActiveElement) + 1 === elementList.length && !event.shiftKey ) {
              event.preventDefault();
              elementList[0].focus();
            }
          }
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (showModal) {
      const modalElement = document.querySelector('.modal-body');
      if (modalElement !== null) {
        const elementList = modalElement.querySelectorAll(focusableElementType);
        if (elementList.length !== 0) {
          elementList[0].focus();
        }
      }
      window.addEventListener('keydown', handleKeyPressEvent);
      return () => {
        console.log('inside return')
        window.removeEventListener('keydown', handleKeyPressEvent);
      };
    }
  }, [handleKeyPressEvent, showModal]);

  if (props.showModal)
    return (
      <div
        className={`modal-outer-content ${showModal ? `showModal` : ``}`}
        onClick={(event) => {
          handleModalClick(event);
        }}
      >
        <div
          className={`modal-inner-content ${
            size === 'sm' ? 'sm-modal' : size === 'lg' ? 'lg-modal' : 'me-modal'
          }`}
          style={style}
        >
          <header
            className={`modal-header ${
              title.length !== 0
                ? 'modal-header-title'
                : 'modal-header-no-title'
            }`}
          >
            {title.length !== 0 ? <h2>{title}</h2> : ''}
            //reduce styling
            <button
              style={{
                top: 10,
                right: 10,
                position: 'absolute',
                fontSize: 12,
                cursor: 'pointer',
              }}
              onClick={() => {
                onClose(false);
              }}
              className={'closeButton'}
            >
              X
            </button>
          </header>
          <div className={'modal-body'}>{children}</div>
        </div>
      </div>
    );
  else return null;
}

export default ModalComponent;
