import React from 'react';
import InputContainer from './InputContainer';
import { getForms, setForms } from '../utils/clientStorage';

class PersonalSection extends React.Component {
    constructor(props) {
        super(props);

        this.storageKey = 'Personal';
        const stateStore = getForms(this.storageKey, this.props.isLoggedIn);

        this.state = {
            form: stateStore
        };

        this.handleChange = this.handleChange.bind(this);
    }

    // when any input is changed, update state, and save it to local storage
    handleChange(formField, value) {
        let { form } = this.state;
        form[formField] = value;

        this.setState({
            form: form
        });

        setForms(this.storageKey, this.state.form, this.props.isLoggedIn);
    }

    componentDidUpdate(prevProps) {
        if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
            const stateStore = getForms(this.storageKey, this.props.isLoggedIn);
            this.setState({
                form: stateStore
            });
        }
    }

    render() {
        const { form } = this.state;

        return (
            <div id={'personal-section'} className={'card-section'}>
                <form>
                    <InputContainer
                        inputFor={'name'}
                        value={form['name']}
                        handleChange={this.handleChange}
                    />
                    <InputContainer
                        inputFor={'profession'}
                        value={form['profession']}
                        handleChange={this.handleChange}
                    />
                    <InputContainer
                        inputFor={'email'}
                        value={form['email']}
                        handleChange={this.handleChange}
                    />
                    <InputContainer
                        inputFor={'phone number'}
                        value={form['phone number']}
                        handleChange={this.handleChange}
                    />
                    <InputContainer
                        inputFor={'website'}
                        value={form['website']}
                        handleChange={this.handleChange}
                    />
                </form>
            </div>
        );
    }
}

export default PersonalSection;
