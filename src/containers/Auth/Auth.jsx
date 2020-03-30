import React, {Component} from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'

class Auth extends Component{
  state={
    isFormValid:false,
    formControls:{
      email:{
        value:"",
        type: "email",
        label:"Email",
        errorMessage:"Enter the correct ema il",
        valid:false,
        touched:false,
        validation:{
          requaired:true,
          email:true
        }
      },
      password:{
          value:"",
          type: "password",
          label:"Password",
          errorMessage:"Enter the correct password",
          valid:false,
          touched:false,
          validation:{
            requaired:true,
            minLength:6
          }
      } 
    }
  }
  
  loginHandler = () =>{

  }
  registerHandler =()=>{

  }
  sumitHandler =(event)=>{
    event.preventdefault()
  }
  validateControl(value, validation){
    if(!validation){
      return true
    }
    let isValid=true

    if(validation.requaired){
      isValid = value.trim() !== "" && isValid
    }

    if(validation.email){
      isValid=is.email(value) && isValid
    }

    if(validation.minLength){
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  onChangeHandler = (event, controlName) => {
     console.log(`${controlName}: `, event.target.value)
     const formControls={...this.state.formControls}
     const control={...formControls[controlName]}
     
     control.value=event.target.value
     control.touched=true
     control.valid=this.validateControl(control.value, control.validation)

     formControls[controlName]=control

    let isFormValid=true

    Object.keys(formControls).forEach(name=>{
      isFormValid=formControls[name].valid && isFormValid
    })

     this.setState({
       formControls, isFormValid
     })
  }


  renderInputs(){
    const inputs = Object.keys(this.state.formControls).map((controlName,index)=>{
      const control = this.state.formControls[controlName]
      return(
        <Input
          key={controlName+index}
          value={control.value}
          type={this.state.formControls[controlName].type}
          label={control.label}
          valid={control.valid}
          touched={control.touched}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}//true  !!
          onChange={event=>this.onChangeHandler(event, controlName)}
        /> 
      )
    })
    return inputs
  }
  render(){
    return(
      <div className={classes.Auth}>
        <div>
         <h1>Authorization</h1>
         <form 
          className={classes.AuthForm}
          action=" " 
          onSubmit={this.sumitHandler
          }>
            {this.renderInputs()}
          <Button
            type="success"
            onClick={this.loginHandler}
            disabled={!this.state.isFormValid}
          >
            Sign in
          </Button>
          <Button
            type="primary"
            onClick={this.registerHandler}
            disabled={!this.state.isFormValid}
          >
            Sign up
          </Button>
         </form>
        </div>
        
      </div>
    )
  }
}
export default Auth