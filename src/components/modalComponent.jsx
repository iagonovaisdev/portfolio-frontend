import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';

export default function ModalComponent(props) {

    return(
        <Modal show={props.show} onHide={props.toggle} size="lg">
            <Modal.Header>
                <button className="closer" onClick={props.toggle}>
                    <i className="lni lni-close"></i>
                </button>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
        </Modal>
    );
    
};