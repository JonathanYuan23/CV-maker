import React from 'react';
import '../styles/InputContainer.css';

class InputContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;

        this.setState({
            value: value
        });

        // pass input value up to form container
        const { handleChange, inputFor } = this.props;
        handleChange(inputFor, value);
    }

    render() {
        const { inputFor } = this.props;
        const { value } = this.state;

        return (
            <label htmlFor={inputFor} className={'input-container'}>
                <span>{inputFor.toUpperCase()}</span>
                <input
                    type={'text'}
                    id={inputFor}
                    value={value}
                    onChange={this.handleChange}
                />
            </label>
        );
    }
}

export default InputContainer;
