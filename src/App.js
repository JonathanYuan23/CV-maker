import React from 'react';
import Nav from './components/Nav';
import PersonalSection from './components/PersonalSection';
import WorkSection from './components/WorkSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';

import { ReactComponent as CaretIcon } from './icons/Caret down.svg';
import { ReactComponent as SaveIcon } from './icons/Save.svg';
import { ReactComponent as LogoutIcon } from './icons/Logout.svg';

import { getFirebaseConfig } from './firebase/firebase-config';
import { initializeApp } from 'firebase/app';
import {
    signInUser,
    signOutUser,
    initFirebaseAuth,
    getUserPhotoURL,
    getUserEmail
} from './firebase/authentication';

import './styles/Reset.css';
import './styles/App.css';

class LogInButton extends React.Component {
    render() {
        const { logIn } = this.props;

        return (
            <button onClick={logIn} id={'log-in-btn'}>
                Log in
            </button>
        );
    }
}

class ProfileButton extends React.Component {
    render() {
        const { userPhotoURL } = this.props;

        return (
            <button id={'profile-btn'}>
                <img
                    src={userPhotoURL}
                    alt={'User profile'}
                    id={'profile-pic-lg'}
                    referrerPolicy={'no-referrer'}
                />
                <CaretIcon id={'caret-icon'} />
            </button>
        );
    }
}

class ProfileTooltip extends React.Component {
    render() {
        const { userEmail, userPhotoURL, logOut } = this.props;

        return (
            <div id={'profile-tooltip'}>
                <div className={'profile-tooltip-item'} id={'user-email'}>
                    <img
                        src={userPhotoURL}
                        alt={'User email'}
                        id={'profile-pic-sm'}
                        referrerPolicy={'no-referrer'}
                    />
                    <span>{userEmail}</span>
                </div>
                <div className={'profile-tooltip-item'} id={'save-btn'}>
                    <SaveIcon id={'save-icon'} />
                    <span>Save to cloud</span>
                </div>
                <div
                    onClick={logOut}
                    className={'profile-tooltip-item'}
                    id={'logout-btn'}
                >
                    <LogoutIcon id={'logout-icon'} />
                    <span>Log out</span>
                </div>
            </div>
        );
    }
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
            activeTab: 'Personal',
            isLoggedIn: false,
            profileTooltipState: 'inactive'
        };

        this.populateUserState = this.populateUserState.bind(this);
        this.tabHandler = this.tabHandler.bind(this);

        const app = initializeApp(getFirebaseConfig());
        initFirebaseAuth(this.populateUserState);
    }

    populateUserState(user) {
        if (user) {
            this.setState({
                isLoggedIn: true
            });
        } else {
            this.setState({
                isLoggedIn: false
            });
        }
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

        const { activeTab, isLoggedIn } = this.state;

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
                {isLoggedIn ? (
                    <>
                        <ProfileButton userPhotoURL={getUserPhotoURL()} />
                        <ProfileTooltip
                            userEmail={getUserEmail()}
                            userPhotoURL={getUserPhotoURL()}
                            logOut={signOutUser}
                        />
                    </>
                ) : (
                    <LogInButton logIn={signInUser} />
                )}
                <Nav activeTab={activeTab} tabHandler={this.tabHandler} />
                {page}
            </>
        );
    }
}

export default App;
