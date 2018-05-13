import React from 'react'
import styles from './header.css'
class header extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className={styles.container}>header</div>
    )
  }
}
export default header