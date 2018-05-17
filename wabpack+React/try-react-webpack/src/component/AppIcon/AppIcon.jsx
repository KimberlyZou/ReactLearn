import React from 'react'
import './AppIcon.scss'
import { Button, Modal } from 'react-bootstrap';
class AppIcon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }
  getInitialState() {
    return { showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({
      showModal: true
    })
  }

  render() {
    const Example = (
      <div>
        {/* <Button
             
              bsSize="large"
              onClick={()=>this.open()}
            >
              弹出示例对话框
            </Button> */}
        <div className='appDetial'>
          <img className='appIconImg' src="../../public/asset/appicon1.jpg" alt="" srcset="" onClick={() => this.open()} />
          <p>Admin</p>
        </div>
        <Modal show={this.state.showModal} onHide={() => this.close()}>
          <Modal.Header >
            <Modal.Title>对话框标题</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>对话框的正文</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.close()}>取消</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );

    return (
      <div className='iconOutside'>{Example}</div>
    )
  }
}
export default AppIcon