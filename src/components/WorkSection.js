import React from 'react';
import InputContainer from './InputContainer';
import { getForms, setForms } from '../utils/localStorage';
import uniqid from 'uniqid';
import AddIcon from './AddIcon';
import DeleteIcon from './DeleteIcon';

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
                form: form,
                formListState: 'inactive'
            };

            setForms('Work', this.state);
        } else {
            this.state = stateStore;
        }

        this.handleChange = this.handleChange.bind(this);
        this.showList = this.showList.bind(this);
        this.hideList = this.hideList.bind(this);
        this.addForm = this.addForm.bind(this);
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

    showList() {
        this.setState({
            formListState: 'active'
        });
    }

    hideList() {
        this.setState({
            formListState: 'inactive'
        });
    }

    addForm() {
        const { defaultForm } = this.props;
        const { forms } = this.state;

        let newForm = Object.assign({}, defaultForm, { id: uniqid() });
        let newForms = forms;
        newForms.unshift(newForm);

        this.setState({
            forms: newForms,
            form: newForm,
            formListState: 'inactive'
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

        const { form, formListState } = this.state;
        let formList;

        // if list display is inactive, show only the current form
        if (formListState === 'inactive') {
            formList = (
                <li className={'form-list-item'} key={form['id']}>
                    <span>{`${form['company']} ${form['title']}`}</span>
                    <DeleteIcon />
                </li>
            );
        } else if (formListState === 'active') {
            formList = (
                <>
                    {forms.map(form => {
                        return (
                            <li className={'form-list-item'} key={form['id']}>
                                <span>{`${form['company']} ${form['title']}`}</span>
                                <DeleteIcon />
                            </li>
                        );
                    })}
                    <li
                        className={'form-list-item add-item'}
                        onClick={this.addForm}
                    >
                        <span>{'Add work'}</span>
                        <AddIcon />
                    </li>
                </>
            );
        }

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
                <ul
                    className={'form-list'}
                    onMouseEnter={this.showList}
                    onMouseLeave={this.hideList}
                >
                    {formList}
                </ul>
            </div>
        );
    }
}

export default WorkSection;
