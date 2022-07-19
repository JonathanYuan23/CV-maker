import React from 'react';
import Nav from './components/Nav';
import PersonalSection from './components/PersonalSection';
import WorkSection from './components/WorkSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';
import { ReactComponent as CaretIcon } from './icons/Caret down.svg';
import './styles/Reset.css';
import './styles/App.css';

function LogInButton() {
    return <button id={'log-in-btn'}>Log in</button>;
}

function ProfileButton() {
    return (
        <button id={'profile-btn'}>
            <img
                src="https://lh3.googleusercontent.com/ogw/AOh-ky1_8Jx5lw1cJqqWW7GwA5tV7ARfl_Xo6vN7YLXx=s32-c-mo"
                alt="User profile"
            />
            <CaretIcon />
        </button>
    );
}

class App extends React.Component {
    constructor() {
        super();

        this.defaultForms = {
            defaultPersonalForm: {
                name: 'Dan Abramov',
                profession: 'Software Engineer',
                email: 'xyz@gmail.com',
                'phone number': '1-234-567-890',
                website: 'github.com/xyz'
            },
            defaultWorkForm: {
                title: 'Software Engineer',
                company: 'Facebook',
                location: 'San Francisco',
                'start date': '2019',
                'end date': 'Present',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porttitor.'
            },
            defaultEducationForm: {
                degree: 'BSc. Honours CS',
                institution: 'UWaterloo',
                location: 'Waterloo, Ontario',
                'start date': '2014',
                'end date': '2019',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porttitor.'
            },
            defaultSkillsForm: {
                title: 'Languages',
                description: 'Java, C++, Python'
            }
        };

        this.state = {
            activeTab: 'Personal'
        };

        this.tabHandler = this.tabHandler.bind(this);
    }

    tabHandler(e) {
        this.setState({
            activeTab: e.currentTarget.textContent
        });
    }

    render() {
        const {
            defaultPersonalForm,
            defaultWorkForm,
            defaultEducationForm,
            defaultSkillsForm
        } = this.defaultForms;

        const { activeTab } = this.state;

        let page;
        // eslint-disable-next-line default-case
        switch (activeTab) {
            case 'Personal':
                page = <PersonalSection defaultForm={defaultPersonalForm} />;
                break;
            case 'Work':
                page = <WorkSection defaultForm={defaultWorkForm} />;
                break;
            case 'Education':
                page = <EducationSection defaultForm={defaultEducationForm} />;
                break;
            case 'Skills':
                page = <SkillsSection defaultForm={defaultSkillsForm} />;
                break;
        }
        return (
            <>
                <ProfileButton />
                <Nav activeTab={activeTab} tabHandler={this.tabHandler} />
                {page}
            </>
        );
    }
}

export default App;
