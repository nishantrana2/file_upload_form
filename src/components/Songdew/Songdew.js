import React, { Component } from 'react';
import Axios from 'axios';
import Input from '../UI/Input/Input';
import classes from './Songdew.module.css';
import Chips, { Chip } from 'react-chips'
import Card from '../UI/Card/Card';

const tago = [];
class Songdew extends Component {


state = {
    orderForm: {
      name: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'Your  First Name'
          },
          value: '',
          validation: {
              required: true,
              minLength : 2
          },
          valid: false,
          touched: false
      },
       lastName: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Last Name'
        },
        value: '',
        validation: {
            required: true,
            minLength : 2
        },
        valid: false,
        touched: false
    },
      email: {
          elementType: 'input',
          elementConfig: {
              type: 'email',
              placeholder: 'Your E-Mail'
          },
          value: '',
          validation: {
              required: true,
              isEmail: true
          },
          valid: false,
          touched: false
      },
      age: {
        elementType: 'input4',
        elementConfig: {
            type: 'number',
            placeholder: 'Your Age'
        },
        value: '',
        validation: {
            required: true,
            minValue: 18,
                    maxValue: 120,
                    isNumeric: true
        },
        valid: false,
        touched: false
    },
    tag: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Add Song Tag'
        },
        value: '',
        validation: {
            required: true,
            minLength : 2
        },
        valid: false,
        touched: false
    },
    
},
selectedFile: null,
name: null,
lastName: null,
age: null,
email: null,
song: null,
toggle: false,
chips: []
}

orderHandler = ( event ) => {
  event.preventDefault();
  this.setState( { loading: true } );
  const formData = {};
  for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
  }
  const order = {
     
      orderData: formData
  }
  console.log(order);
 
}

checkValidity(value, rules) {
  let isValid = true;
  if (!rules) {
      return true;
  }
  
  if (rules.required) {
      isValid = value.trim() !== '' && isValid;
  }

  if (rules.minValue) {
      isValid = value >= rules.minValue && isValid
  }

  if (rules.maxValue) {
      isValid = value <= rules.maxValue && isValid
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid
}

if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid
}
  
  

  if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
  }

  if (rules.isNumeric) {
      const pattern = /^\d+$/;
      
      isValid = pattern.test(value) && isValid
  }

  return isValid;
}

inputChangedHandler = (event, inputIdentifier) => {
  const updatedOrderForm = {
      ...this.state.orderForm
  };
  const updatedFormElement = { 
      ...updatedOrderForm[inputIdentifier]
  };
  updatedFormElement.value = event.target.value;
  updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
  updatedFormElement.touched = true;
  updatedOrderForm[inputIdentifier] = updatedFormElement;
  
  let formIsValid = true;
  for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
  }
  this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
}
fileSelectedHandler = event => {
    
   let size = event.target.files[0].size;
    
            const file = Math.round((size / 1024)); 
            // The size of the file. 
            if (file >= 10096) { 
                alert( 
                  "File too Big, please select a file less than 10mb"); 
            } 

    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  fileUploadHandler = () => {
      const fd = new FormData();
      fd.append("music", this.state.selectedFile);

      console.log(fd)
      for (let formElementIdentifier in this.state.orderForm) {
      
        fd.append(formElementIdentifier , this.state.orderForm[formElementIdentifier].value);
    }
    Axios.post("https://httpbin.org/anything", fd)
      .then(res => 
        {
            console.log(res);

            this.setState({
                name: res.data.form.name,
                lastName: res.data.form.lastName,
                age: res.data.form.age,
                email: res.data.form.email,
                song: res.data.files.music,
                tag: res.data.form.tag,
            toggle: true
            })

        })
      .catch(err => console.log(err));
  }
  add = () => {

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
        if(formElementIdentifier === "tag")
        formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    console.log(formData)
    if(tago.length <= 4){
        tago.push(formData.tag);
      
        this.setState({chips: tago});
    }

  }

   onChange = chips => {
       
    this.setState({ chips });
       
      }
 
  
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
        formElementsArray.push({
            id: key,
            config: this.state.orderForm[key]
        });
    }

    
    let form = (
        <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            ))}
            
          
        </form>
    );
let show;
    if (this.state.toggle) {
        show = (
            <h1
                style={{
                    color: "#4b728a",
                    width: "100%",
                    height: "20rem",
                    textAlign: "center",
                }}
            >
                {" "}
                {this.state.name}
                <br/>
                
                {this.state.lastName} <br/>
                {this.state.email} <br/>
                {this.state.age} <br/>
               
                
            </h1>
        );
        
        
    }
    
     
     
    
  return (
    <section className={classes.Songdews-form}>
 <Card>
    <div className={classes.Songdew}>
    
    <Chips
          value={this.state.chips}
          onChange={this.onChange}
           suggestions={["Your", "Data", "Here"]}
           
 
        />
       
        

    {form}
    <button  onClick={this.add} > ADD</button>
    
    
    <br />
    <input  
    type="file" 
    accept="audio/*" 
     onChange={this.fileSelectedHandler}
      />
    
            <button style={{width: 472}}  onClick={this.fileUploadHandler}>Submit</button>
    {show}
   

</div>
</Card>
</section>
    
  );
  }

}

export default Songdew;