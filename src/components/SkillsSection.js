import React from 'react';

import InputContainer from './InputContainer';
import FormList from './FormList';

import { getForms } from '../utils/clientStorage';
import {
    handleChange,
    showList,
    hideList,
    addForm,
    deleteForm,
    changeForm
} from '../utils/callbacks';

class SkillsSection extends React.Component {
    constructor(props) {
        super(props);

        this.storageKey = 'Skills';
        const stateStore = getForms(this.storageKey, this.props.isLoggedIn);

        this.state = {
            forms: stateStore,
            form: stateStore[0],
            formListState: 'inactive'
        };

        // bind event handlers
        this.handleChange = handleChange.bind(this);
        this.showList = showList.bind(this);
        this.hideList = hideList.bind(this);
        this.addForm = addForm.bind(this);
        this.changeForm = changeForm.bind(this);
        this.deleteForm = deleteForm.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
            const stateStore = getForms(this.storageKey, this.props.isLoggedIn);
            this.setState({
                forms: stateStore,
                form: stateStore[0]
            });
        }
    }

    render() {
        const { form, forms, formListState } = this.state;

        return (
            <div id={'skills-section'} className={'card-section'}>
                <form>
                    <InputContainer
                        inputFor={'title'}
                        value={form['title']}
                        handleChange={this.handleChange}
                    />
                    <InputContainer
                        inputFor={'description'}
                        value={form['description']}
                        handleChange={this.handleChange}
                    />
                </form>
                <FormList
                    form={form}
                    forms={forms}
                    formListState={formListState}
                    addForm={this.addForm}
                    deleteForm={this.deleteForm}
                    changeForm={this.changeForm}
                    showList={this.showList}
                    hideList={this.hideList}
                    formPropertyMain={'title'}
                    formPropertySecondary={'description'}
                    addPrompt={'skill'}
                />
            </div>
        );
    }
}

export default SkillsSection;
