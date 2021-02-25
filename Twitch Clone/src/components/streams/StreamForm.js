import React from 'react';
import { Field, reduxForm } from 'redux-form';


class StreamForm extends React.Component {

    renderInput ({input, label, meta}) {
        const className = `field ${meta.error && meta.touched ? 'error':''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {meta.touched && meta.error ? 
                    <div className="ui error message">
                        <div>
                            {meta.error}
                        </div>
                    </div>
                :null}
            </div>
            
        );
    };

    onSubmit = async (formValues) => {
        await this.props.onSubmit(formValues);
    };

    render () {
        return (
            <div>
                <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="streamTitle" component={this.renderInput} label="Stream Title"/>
                    <Field name="streamDescription" component={this.renderInput} label="Stream Description"/>
                    <button type="submit" className="ui primary button">Submit</button>
                </form>
            </div>
        );
    };
};

const validate = (formValues) => {
    const errors = {};
    if(!formValues.streamTitle){
        errors.streamTitle = 'You must enter a Title';
    };
    if(!formValues.streamDescription){
        errors.streamDescription = 'You must enter a Description';
    };
    return errors;
}


export default reduxForm({
    form: 'streamForm',
    validate: validate,
})(StreamForm);