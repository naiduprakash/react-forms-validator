# react-forms-validator

Component to provide simple form validation for React components. 

If you find any bug or error, please feel free to raise an issue. Pull requests are also welcome.

## Installation

``
npm i -S react-forms-validator
``


## Example usage

first of all import the module.

That's it. We can now use it in our React components:

>import Validator from 'react-forms-validator';

```javascript

import React, { Component } from 'react';
import Validator from 'react-forms-validator';

class Login extends React.Component{
    
    constructor( props ){
        super( props );
        this.state = {
            contact_no:"",
            password:"",
            isFormValidationErrors : true,
            submitted:false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.isValidationError = this.isValidationError.bind(this);
        this.flag= true;
    }
    
    
    handleChange(event){
        let { name, value } = event.target;
        this.setState( { [name]:value } );
        let { submitted } = this.state;
    }

    isValidationError(flag){
         this.setState({isFormValidationErrors:flag});
    }
        
    handleFormSubmit(event){
        event.preventDefault();
        this.setState( { submitted:true } );
        let { contact_no, password, isFormValidationErrors } = this.state;
        if ( !isFormValidationErrors ){
            //you are ready to perform your action here like dispatch
            // let { dispatch, login } = this.props;
            // dispatch( login( { params:{},data:{ contact_no, password } } ) );
        }
    }
        
    render() {
        let { contact_no, password, submitted } = this.state;
        return(
            <div>
                <form noValidate onSubmit={this.handleFormSubmit}>
                    <div className="formgroup">
                        <Input 
                            type="text" name="email" 
                            placeholder="Contact number" 
                            value={ contact_no } 
                            onChange={ this.handleChange }/>
                            <Validator 
                                isValidationError={this.isValidationError}
                                isFormSubmitted={submitted} 
                                reference={{contact_no:contact_no}}
                                validationRules={{required:true,number:true,maxLength:10}} 
                                validationMessages={{required:"This field is required",number:"Not a valid number",maxLength:"Not a valid number"}}/>
                    </div>
                    <div className="formgroup">
                        <Input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={ password } 
                            onChange={ this.handleChange } 
                            autoComplete/>
                            <Validator 
                                isValidationError={this.isValidationError}
                                isFormSubmitted={submitted} 
                                reference={{password:password}} 
                                validationRules={{required:true}} 
                                validationMessages={{required:"This field is required",}}/>

                    </div>
                    <div>
                        <button type="submit">Sign In</button>
                    </div>
                </form>
            </div>  
        )
    }
}
```

## Component and props

```react-forms-validator``` provides a ```Validator``` component. Also provide five (5) required props. For now all props are required.

```isValidationError``` function.

```isFormSubmitted``` boolean [true|false]. true - form is submitted || false - form is not submitted 

```reference``` object key value pair. value is equal to relative input value . State value like ```contact_no``` and ```password``` in above example.

```validationRules``` object. chack below for available rules.

```validationMessages``` object. 

Note:: key of ```validationRules``` object and ```validationMessages``` must be same.


## Available validation rules 

**required** :-  required:<boolean> ```required:true```
**minLength** :- minLength:<length> ```minLength:6```
**maxLength** :- maxLength:<length> ```maxLength:10```
**email** :- email:<boolean> ```email:true```
**url** :- url:<boolean> ```url:true```
**number** :- number:<boolean> ```number:true```
**date** :- date:<boolean> ```date:true```
**color** :- color:<boolean> ```color:true```
**equalTo** :- equalTo:<refererValue> ```equalTo:password```

Note:- in equalTo password is a value to which this rule is validates

**More are comming**
 