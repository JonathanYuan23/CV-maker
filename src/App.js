import React from 'react';
import Nav from './components/Nav';
import PersonalSection from './components/PersonalSection';
import WorkSection from './components/WorkSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';

import defaultForms from './utils/defaultForms';

import { ReactComponent as CaretIcon } from './icons/Caret down.svg';
import { ReactComponent as SaveIcon } from './icons/Save.svg';
import { ReactComponent as LogoutIcon } from './icons/Logout.svg';

import { getFirebaseConfig } from './firebase/firebase-config';
import { initializeApp } from 'firebase/app';
import {
    signInUser,
    signOutUser,
    registerAuthListener,
    disableAuthPersistence,
    getUserPhotoURL,
    getUserEmail,
    getUID
} from './firebase/authentication';

import './styles/Reset.css';
import './styles/App.css';

class LogInButton extends React.Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(e) {
        e.stopPropagation();

        const { logIn } = this.props;
        logIn();
    }

    render() {
        return (
            <button onClick={this.clickHandler} id={'log-in-btn'}>
                Log in
            </button>
        );
    }
}

class ProfileButton extends React.Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(e) {
        e.stopPropagation();

        const { changeTooltipState } = this.props;
        changeTooltipState();
    }

    render() {
        const { userPhotoURL, tooltipState } = this.props;

        return (
            <button
                id={'profile-btn'}
                onClick={this.clickHandler}
                className={`${
                    tooltipState === 'active' ? 'active' : 'inactive'
                }`}
            >
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
    constructor(props) {
        super(props);
        this.logOutHandler = this.logOutHandler.bind(this);
    }

    clickHandler(e) {
        e.stopPropagation();
    }

    logOutHandler() {
        const { logOut, changeTooltipState } = this.props;
        changeTooltipState();
        logOut();
    }

    render() {
        const { userEmail, userPhotoURL, tooltipState } = this.props;

        if (tooltipState === 'inactive') {
            return null;
        }

        return (
            <div id={'profile-tooltip'} onClick={this.clickHandler}>
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
                    onClick={this.logOutHandler}
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

        this.state = {
            activeTab: 'Personal',
            isLoggedIn: false,
            profileTooltipState: 'inactive'
        };

        this.populateUserData = this.populateUserData.bind(this);
        this.changeTooltipState = this.changeTooltipState.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.tabHandler = this.tabHandler.bind(this);

        // firebase setup
        initializeApp(getFirebaseConfig());
        disableAuthPersistence();
        registerAuthListener(this.populateUserData);
    }

    populateUserData(user) {
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

    changeTooltipState() {
        this.setState(prevState => ({
            profileTooltipState:
                prevState.profileTooltipState === 'active'
                    ? 'inactive'
                    : 'active'
        }));
    }

    clickHandler() {
        if (this.state.profileTooltipState === 'active') {
            this.changeTooltipState();
        }
    }

    tabHandler(e) {
        this.setState({
            activeTab: e.currentTarget.textContent
        });
    }

    componentDidMount() {
        document.addEventListener('click', this.clickHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.clickHandler);
    }

    render() {
        const {
            defaultPersonalForm,
            defaultWorkForm,
            defaultEducationForm,
            defaultSkillsForm
        } = defaultForms;

        const { activeTab, isLoggedIn, profileTooltipState } = this.state;

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
                        <ProfileButton
                            userPhotoURL={getUserPhotoURL()}
                            changeTooltipState={this.changeTooltipState}
                            tooltipState={profileTooltipState}
                        />
                        <ProfileTooltip
                            userEmail={getUserEmail()}
                            userPhotoURL={getUserPhotoURL()}
                            logOut={signOutUser}
                            changeTooltipState={this.changeTooltipState}
                            tooltipState={profileTooltipState}
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
