import React from 'react';
import '../styles/InputContainer.css';

class InputContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.placeholder,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            value: e.target.value,
        });
    }

    render() {
        const { inputFor } = this.props;
        const { value } = this.state;

        return (
            <label htmlFor={inputFor} class={'input-container'}>
                <span>{inputFor}</span>
                <input
                    type="text"
                    id={inputFor}
                    value={value}
                    onChange={this.handleChange}
                />
            </label>
        );
    }
}

export default InputContainer;
