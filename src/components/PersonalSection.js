import React from 'react';
import InputContainer from './InputContainer';
import { getForms, setForms } from '../utils/localStorage';

class PersonalSection extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

        const { defaultForm } = this.props;
        const stateStore = getForms('Personal');

        // if this is the first time the form is rendered, render the default form
        if (!stateStore) {
            let form = Object.assign({}, defaultForm);

            this.state = {
                form: form
            };

            setForms('Personal', this.state);
        } else {
            this.state = stateStore;
        }

        this.handleChange = this.handleChange.bind(this);
    }

    // when any input is changed, update state, and save it to local storage
    handleChange(formField, value) {
        let { form } = this.state;
        form[formField] = value;

        this.setState({
            form: form
        });

        setForms('Personal', this.state);
    }

    render() {
        const { form } = this.state;

        return (
            <div id="personal-section" className={'card-section'}>
                <form>
                    <InputContainer
                        inputFor={'name'}
                        value={'First Last'}
                        handleChange={this.handleChange}
                    />
                    <InputContainer
                        inputFor={'profession'}
                        value={form['profession']}
                        handleChange={this.handleChange}
                    />
                    <InputContainer inputFor={'email'} value={form['email']} />
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
