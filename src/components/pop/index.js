import React, { Component , useState} from 'react'
import { Modal, Col, Row, Button} from 'react-bootstrap'

import styles from './styles.module.css'

class Pop extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: null
    };

    this.modals = [
      {
        buttonText: 'Success',
        xsOffset: 1,
        reactId: 'success',
        colors: '#22bf7c',
        icon: 'fas fa-check-circle fa-3x',
      
        modalText: 'Success is walking from failure to failure with no loss of enthusiasm.'
      },
      {
        buttonText: 'Error',
        xsOffset: 0,
        mdPull: 2,
        reactId: 'error',
        colors:'red',
        icon:'fas fa-exclamation-triangle fa-3x',
       
        modalText: 'Success is walking from failure to failure with no loss of enthusiasm.'
      },
      {
        buttonText: 'Info',
        xsOffset: 3,
        reactId: 'info',
        colors:'blue',
        icon:'fas fa-exclamation-circle fa-3x',
       
        modalText: 'Success is walking from failure to failure with no loss of enthusiasm.'
      }
    ]
  }

  handleClose() {
    this.setState({show: null});
  }

  handleShow(id) {
    this.setState({show: id});
  }

  renderModals() {
    return this.modals.map(modal => {
      return (
        <Row  key={modal.reactId}>
        <Col xsOffset={modal.xsOffset} sm={5} mdPull={modal.mdPull}>
          <Button bsStyle="primary" bsSize="small" block onClick={() => this.handleShow(modal.reactId)}>
            <h1>{modal.buttonText}</h1>
          </Button>
          <Modal
            show={this.state.show === modal.reactId} onHide={this.handleClose}
          >
          
            <Modal.Body className={"box "+ styles.box } style={{backgroundColor:modal.colors}}>
                 <div className={styles.box1}>
                <h2><i className={modal.icon}></i></h2>
              <h2 className="heading">{modal.buttonText}</h2>
              <p className='landing-page-markers you-are-here'>{modal.modalText}</p>
        </div>
            </Modal.Body>
          </Modal>

          
        </Col>
      </Row>
      )
    });
  }

  render() {
    return (
      <div className="App">
       
        <div>
       {this.renderModals()}
        </div>
      </div >
    );
  }
}


export default Pop








