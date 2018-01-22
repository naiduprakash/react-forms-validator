import React from 'react';
import { forEach, isEqual,isEmpty,findIndex,hasIn }  from 'lodash';
import PropTypes from 'prop-types';
import { format } from 'util';

let formElements = {};

export default class Validator extends React.Component{

    static propTypes (){
        isFormSubmitted:PropTypes.bool.isRequired;
        reference:PropTypes.object.isRequired;
        validationRules:PropTypes.object.isRequired;
        validationMessages:PropTypes.object.isRequired;
        isValidationError:PropTypes.func.isRequired;
    }

    constructor(props){
        super(props);
        this.state = {
            error:""
        };
        this.formElements = [];
    }
    
    componentWillReceiveProps(nextProps){
        let { isFormSubmitted, reference, validationRules, validationMessages, isValidationError } = nextProps;

        if ( !isEqual( isFormSubmitted, this.props.isFormSubmitted ) || !isEqual( reference, this.props.reference )){
            if( validationRules ){
                
                let flag=[];
                let tempElements = formElements;

                forEach(reference,(val,key)=>{
                    tempElements[key] = { validationRules: validationRules, validationMessages: validationMessages, reference: reference };
                })

                forEach(tempElements,(val,key)=>{
                    let tempflag = true;
                    let tempflag2 = true;
                    let message = "";
                    forEach( val['validationRules'], ( rule, func ) => {
                        if (tempflag){
                            if (isEqual(val['validationRules'], validationRules) && isEqual(val['validationMessages'], validationMessages)) {
                                
                                message = val['validationMessages'][func];
                                forEach(val['reference'], (val, key) => {
                                    if (this[func](rule, val)) {
                                        this.setState({ error: message });
                                        tempflag = false;
                                    }else{
                                        this.setState({ error: "" });
                                        tempflag = true;
                                    }
                                })
                            }else{
                                forEach(val['reference'], (val, key) => {
                                    if (this[func](rule, val)) {
                                        tempflag = false;
                                    }
                                })
                            }
                        }
                    });
                    flag.push(tempflag);
                });

                formElements = tempElements;
                if(flag.includes(false)){
                    if(isValidationError){
                        isValidationError(true);
                    }
                }
                else{
                    if(isValidationError){
                        isValidationError(false);
                    }
                }
            }
        }
    }
    required( rule, value ){
        if (rule === true){
            return value.toString().trim().length === 0;
        }
        return false
    }
    minLength( rule, value ){
        if (parseInt(rule)){
            return value.toString().trim().length < rule;
        }
        return false;
    }
    maxLength( rule, value ){
        if (parseInt(rule)){
            return value.toString().trim().length > rule;
        }
        return false;
    }
    email( rule, value){
        if (rule === true){
            
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        }
        return false;
    }
    url( rule, value ){
        if ( rule === true ){
            return !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value);
        }
        return false;
    }
    number( rule, value ){
        if (rule === true){
            return !/^[-+]?\d+$/gm.test(value);
        }
        return false;
    }
    date( rule, value ){
        if (rule === true){
            return !/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](18|19|20|21)\d\d$/gm.test(value);
        }
        return false;
    }
    color(rule,value){
        if (rule === true){
            return !/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value);
        }
        return false;
    }
    
    
    render(){
        let { error } = this.state;
        return( 
            <span className="error" style={{color:'red',fontSize:`12'px'`}}>{error}</span>
        );
    }

} 