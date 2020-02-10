import React, {Component} from 'react'
import classes from "./Layout.module.css"
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
class Layout extends Component {
  state={
    menu:false
  }
  toggleMenuHadler =()=>{
    this.setState({
      menu:!this.state.menu
    })
  }
  menuCloseHandler =()=>{
    this.setState({
      menu:false
    })
  }
  render (){
    return(
      <div className={classes.Layout}>
        <Drawer
          isOpen={this.state.menu}
          onClose={this.menuCloseHandler}
        /> 
        <MenuToggle
          onToggle={this.toggleMenuHadler}
          isOpen={this.state.menu}
        />
        <main>  
          {this.props.children}
        </main>
      </div>
    )
  } 
}
export default Layout;