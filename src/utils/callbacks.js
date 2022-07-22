import { setForms } from './clientStorage';
import uniqid from 'uniqid';

function handleChange(formField, value) {
    let { form, forms } = this.state;

    // current form is always at front of forms array
    form[formField] = value;
    forms[0] = form;

    this.setState(
        {
            forms: forms,
            form: form
        },
        () => {
            setForms(this.storageKey, this.state);
        }
    );
}

function showList() {
    this.setState({
        formListState: 'active'
    });
}

function hideList() {
    this.setState({
        formListState: 'inactive'
    });
}

function addForm() {
    const { startingForm } = this.props;
    const { forms } = this.state;

    let newForm = Object.assign({}, startingForm, { id: uniqid() });
    let newForms = forms;
    newForms.unshift(newForm);

    this.setState(
        {
            forms: newForms,
            form: newForm,
            formListState: 'inactive'
        },
        () => {
            setForms(this.storageKey, this.state);
        }
    );
}

function deleteForm(e) {
    e.stopPropagation();
    const id = e.currentTarget.parentNode.getAttribute('data-key');
    const { startingForm } = this.props;
    const { form, forms } = this.state;

    // remove selected form, add default if array is then empty
    let newForm;
    const newForms = forms.filter(form => form['id'] !== id);

    if (!newForms.length) {
        newForm = Object.assign({}, startingForm, { id: uniqid() });
        newForms.unshift(newForm);
    } else if (form['id'] === id) {
        newForm = newForms[0];
    } else {
        newForm = form;
    }

    this.setState(
        {
            forms: newForms,
            form: newForm,
            formListState: 'inactive'
        },
        () => {
            setForms(this.storageKey, this.state);
        }
    );
}

function changeForm(e) {
    const id = e.currentTarget.getAttribute('data-key');
    const { forms } = this.state;

    // destructure the form that is selected, and move it to the front of the forms array
    const newForm = forms.filter(form => form['id'] === id)[0];
    const newForms = [newForm].concat(forms.filter(form => form['id'] !== id));

    this.setState(
        {
            forms: newForms,
            form: newForm,
            formListState: 'inactive'
        },
        () => {
            setForms(this.storageKey, this.state);
        }
    );
}

export { handleChange, showList, hideList, addForm, deleteForm, changeForm };
