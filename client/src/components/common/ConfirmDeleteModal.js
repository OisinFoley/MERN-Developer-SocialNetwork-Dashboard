import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ConfirmDeleteModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
   this.handleClick = this.handleClick.bind(this);
 }

  handleClick() {
    let clickedId = this.props.id;
    let clickedNestedId = this.props.nestedId;
    this.props.onDelete(clickedId, clickedNestedId);
  }

  render() {

    let modalId = this.props.modalId;
    let modalTitle = this.props.modalTitle;
    let modalBody = this.props.modalBody;

    return (
      <div className="modal fade" id={`${modalId}`} tabIndex="-1" role="dialog" aria-labelledby={`${modalId}-ModalLabel`} aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${modalId}-ModalLabel`}>{modalTitle}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            {modalBody}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={this.handleClick.bind(this, this.props.id, (this.props.nestedId !== null ? (this.props.nestedId) : null ))} data-dismiss="modal">Confirm Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

ConfirmDeleteModal.propTypes = {
  modalId: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  modalBody: PropTypes.string.isRequired
};

ConfirmDeleteModal.defaultProps = {
  type: 'text'
};

export default ConfirmDeleteModal;