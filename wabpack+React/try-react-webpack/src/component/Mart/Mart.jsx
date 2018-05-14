import React from 'react';
import './Mart.scss';
import $ from 'jquery';
import { Button } from 'react-bootstrap';

class Mart extends React.Component {
  constructor(props) {
    super(props)
    this.selectElement = this.selectElement.bind(this);
  }

  render() {
    return (
      <div>
        <Button onClick={this.selectElement}>点击一下</Button>
        <h4 className="text">这是：12</h4>
      </div>
    )
  }
  selectElement() {
    console.log('text对象：', $('.text'));
    console.log('text中的值：', $('.text')[0].textContent);

  }

}
export default Mart