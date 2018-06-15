import React, { Component } from 'react';

export class ButtonCustomForm extends Component {
    render() {
        return (
            <div className="pure-control-group">
                <label>{this.props.label}</label>
                <button type="submit" className="pure-button pure-button-primary">{this.props.buttonText}</button>
            </div>
        );
    }
}
export default ButtonCustomForm;
