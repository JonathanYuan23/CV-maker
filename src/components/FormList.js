import React from 'react';
import uniqid from 'uniqid';
import AddIcon from './AddIcon';
import DeleteIcon from './DeleteIcon';
import '../styles/FormList.css';

class FormList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {
            form,
            forms,
            formListState,
            addForm,
            deleteForm,
            changeForm,
            showList,
            hideList,
            formPropertyMain,
            formPropertySecondary,
            addPrompt
        } = this.props;

        let formList;

        // if list display is inactive, show only the current form
        if (formListState === 'inactive') {
            formList = (
                <li
                    className={'form-list-item'}
                    key={form['id']}
                    data-key={form['id']}
                    onClick={changeForm}
                >
                    <span>{`${form[formPropertyMain]} ${form[formPropertySecondary]}`}</span>
                    <DeleteIcon deleteHandler={deleteForm} />
                </li>
            );
        } else if (formListState === 'active') {
            formList = (
                <>
                    {forms.map(form => {
                        return (
                            <li
                                className={'form-list-item'}
                                key={form['id']}
                                data-key={form['id']}
                                onClick={changeForm}
                            >
                                <span>{`${form[formPropertyMain]} ${form[formPropertySecondary]}`}</span>
                                <DeleteIcon deleteHandler={deleteForm} />
                            </li>
                        );
                    })}
                    <li
                        className={'form-list-item add-item'}
                        key={uniqid()}
                        onClick={addForm}
                    >
                        <span>{`Add ${addPrompt}`}</span>
                        <AddIcon />
                    </li>
                </>
            );
        }

        return (
            <ul
                className={'form-list'}
                onMouseEnter={showList}
                onMouseLeave={hideList}
            >
                {formList}
            </ul>
        );
    }
}

export default FormList;
