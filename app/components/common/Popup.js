import React, { PureComponent } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    zIndex: 401,
    transform: 'translate(-50%, -50%)',
    padding: '10px 20px',
    background: '#fff',
  },
  overlay: {
    overflow: 'hidden',
  }
};

Modal.setAppElement('#app');

class ModalPopup extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderDefaultContent(title, description) {
    return (
      <div className="modal-content">
        <h3 className="modal-title">
          {title}
        </h3>
        <div className="modal-description">
          {description}
        </div>
      </div>
    );
  }

  render() {
    const { title, description } = this.props;
    return (
      <Modal
        {...this.props}
        style={customStyles}
        contentLabel="Table Header Modal"
        shouldCloseOnOverlayClick={true}
        preventScroll={true}
        ariaHideApp={true}
        bodyOpenClassName="body-open"
      >
        {this.renderDefaultContent(title, description)}
      </Modal>
    );
  }
}

export default ModalPopup;
