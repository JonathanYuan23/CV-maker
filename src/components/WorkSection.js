import React from 'react';
import InputContainer from './InputContainer';
import { getForms, setForms } from '../utils/localStorage';
import uniqid from 'uniqid';

class WorkSection extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

        const { defaultForm } = this.props;
        const stateStore = getForms('Work');

        // if this is the first time the form is rendered, render the default form
        if (!stateStore) {
            let form = Object.assign({}, defaultForm, { id: uniqid() });

            this.state = {
                forms: [form],
                form: form
            };

            setForms('Work', this.state);
        } else {
            this.state = stateStore;
        }

        this.handleChange = this.handleChange.bind(this);
    }

    // when any input is changed, update state, and save it to local storage
    handleChange(formField, value) {
        let { form, forms } = this.state;

        // current form is always at front of forms array
        form[formField] = value;
        forms[0] = form;

        this.setState({
            forms: forms,
            form: form
        });

        setForms('Work', this.state);
    }

    render() {
        const { defaultForm } = this.props;
        const { forms } = this.state;

        if (!forms.length) {
            let form = Object.assign({}, defaultForm, { id: uniqid() });

            this.setState({
                forms: forms.concat(form),
                form: form
            });
        }

        const { form } = this.state;

        return (
            <div id="work-section" className={'card-section'}>
                <form>
                    <InputContainer
                        inputFor={'title'}
                        value={form['title']}
                        handleChange={this.handleChange}
                    />
                    <InputContainer
                        inputFor={'company'}
                        value={form['company']}
                        handleChange={this.handleChange}
                    />
                    <InputContainer
                        inputFor={'location'}
                        value={form['location']}
                        handleChange={this.handleChange}
                    />
                    <InputContainer
                        inputFor={'start date'}
                        value={form['start date']}
                        handleChange={this.handleChange}
                    />
                    <InputContainer
                        inputFor={'end date'}
                        value={form['end date']}
                        handleChange={this.handleChange}
                    />
                    <InputContainer
                        inputFor={'description'}
                        value={form['description']}
                        handleChange={this.handleChange}
                    />
                </form>
            </div>
        );
    }
}

export default WorkSection;
