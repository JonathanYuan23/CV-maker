import React from 'react';
import Nav from './components/Nav';
import PersonalSection from './components/PersonalSection';
import WorkSection from './components/WorkSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';

import defaultForms from './utils/defaultForms';
import { getAllForms } from './utils/clientStorage';

import { ReactComponent as CaretIcon } from './icons/Caret down.svg';
import { ReactComponent as SaveIcon } from './icons/Save.svg';
import { ReactComponent as LogoutIcon } from './icons/Logout.svg';

import { getFirebaseConfig } from './firebase/firebaseConfig';
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
import { getFirestore } from 'firebase/firestore';
import { getUserDoc, setUserDoc } from './firebase/firestore';

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
                className={`${
                    tooltipState === 'active' ? 'active' : 'inactive'
                }`}
                onClick={this.clickHandler}
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
        this.saveHandler = this.saveHandler.bind(this);
        this.logOutHandler = this.logOutHandler.bind(this);
    }

    clickHandler(e) {
        e.stopPropagation();
    }

    saveHandler() {
        const { saveToFirestore, changeTooltipState } = this.props;
        changeTooltipState();
        saveToFirestore();
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
                <div
                    className={'profile-tooltip-item'}
                    id={'save-btn'}
                    onClick={this.saveHandler}
                >
                    <SaveIcon id={'save-icon'} />
                    <span>Save to cloud</span>
                </div>
                <div
                    className={'profile-tooltip-item'}
                    id={'logout-btn'}
                    onClick={this.logOutHandler}
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

        this.startingForms = defaultForms;

        this.state = {
            activeTab: 'Personal',
            isLoggedIn: false,
            profileTooltipState: 'inactive'
        };

        this.populateUserData = this.populateUserData.bind(this);
        this.saveToFirestore = this.saveToFirestore.bind(this);
        this.changeTooltipState = this.changeTooltipState.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.tabHandler = this.tabHandler.bind(this);
    }

    componentDidMount() {
        // firebase setup
        this.app = initializeApp(getFirebaseConfig());
        this.db = getFirestore(this.app);
        disableAuthPersistence();
        registerAuthListener(this.populateUserData);

        document.addEventListener('click', this.clickHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.clickHandler);
    }

    populateUserData(user) {
        if (user) {
            this.setState({
                isLoggedIn: true
            });

            getUserDoc(this.db, getUID()).then(data => {
                if (data) {
                    this.startingForms = data;
                } else {
                    setUserDoc(this.db, getUID(), defaultForms);
                }
            });
        } else {
            this.setState({
                isLoggedIn: false
            });
            this.startingForms = defaultForms;
        }
    }

    saveToFirestore() {
        setUserDoc(this.db, getUID(), getAllForms());
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

    render() {
        const { personal, work, education, skills } = this.startingForms;

        const { activeTab, isLoggedIn, profileTooltipState } = this.state;

        let page;
        // eslint-disable-next-line default-case
        switch (activeTab) {
            case 'Personal':
                page = <PersonalSection startingForm={personal} />;
                break;
            case 'Work':
                page = <WorkSection startingForm={work} />;
                break;
            case 'Education':
                page = <EducationSection startingForm={education} />;
                break;
            case 'Skills':
                page = <SkillsSection startingForm={skills} />;
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
                            saveToFirestore={this.saveToFirestore}
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
