import React from 'react'
import { Modal } from 'react-bootstrap'

const AddProject = (props) => {
    const styles = {
        addModal: {
            position: "absolute",
            width: "50vw",
            background: "#FFFFFF",
            top: 0,
            right: 0,
            bottom: 0,
            left: '50vw',
            display: 'inline-flex',
            padding: '54px 48px',
            flexDirection: 'column',
            alignItems: "flex-start",
            gap: '20px',
          },
    }
  return (
    <>
        <Modal
            show={props.show}
            onHide={props.onHide}
            style={styles.addModal}
            dialogClassName="filter-dialog"
            animation={false}
        >

        </Modal>
    </>
  )
}

export default AddProject