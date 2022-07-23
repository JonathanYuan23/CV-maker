import React from 'react';
import { ProfileButton, ProfileTooltip } from './components/Profile';
import Nav from './components/Nav';
import PersonalSection from './components/PersonalSection';
import WorkSection from './components/WorkSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';

import defaultForms from './utils/defaultForms';
import {
    initClientStorage,
    setForms,
    getAllForms
} from './utils/clientStorage';

import uniqid from 'uniqid';

import { getFirebaseConfig } from './firebase/firebaseConfig';
import { initializeApp } from 'firebase/app';
import {
    signInUser,
    signOutUser,
    registerAuthListener,
    limitAuthPersistence,
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

class App extends React.Component {
    constructor() {
        super();

        const { personal, work, education, skills } = defaultForms;

        initClientStorage('Personal', personal, uniqid(), false);
        initClientStorage('Work', work, uniqid(), false);
        initClientStorage('Education', education, uniqid(), false);
        initClientStorage('Skills', skills, uniqid(), false);

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
        limitAuthPersistence();
        registerAuthListener(this.populateUserData);

        document.addEventListener('click', this.clickHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.clickHandler);
    }

    populateUserData(user) {
        if (user) {
            const { personal, work, education, skills } = defaultForms;

            getUserDoc(this.db, getUID())
                .then(data => {
                    if (data) {
                        setForms('Personal', data['personal'], true);
                        setForms('Work', data['work'], true);
                        setForms('Education', data['education'], true);
                        setForms('Skills', data['skills'], true);
                    } else {
                        initClientStorage('Personal', personal, uniqid(), true);
                        initClientStorage('Work', work, uniqid(), true);
                        initClientStorage(
                            'Education',
                            education,
                            uniqid(),
                            true
                        );
                        initClientStorage('Skills', skills, uniqid(), true);
                    }
                })
                .then(() => {
                    this.setState({
                        isLoggedIn: true
                    });
                });
        } else {
            this.setState({
                isLoggedIn: false
            });
        }
    }

    saveToFirestore() {
        setUserDoc(this.db, getUID(), getAllForms(this.state.isLoggedIn));
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
        const { personal, work, education, skills } = defaultForms;
        const { activeTab, isLoggedIn, profileTooltipState } = this.state;

        let page;
        // eslint-disable-next-line default-case
        switch (activeTab) {
            case 'Personal':
                page = (
                    <PersonalSection
                        defaultForm={personal}
                        isLoggedIn={isLoggedIn}
                    />
                );
                break;
            case 'Work':
                page = (
                    <WorkSection defaultForm={work} isLoggedIn={isLoggedIn} />
                );
                break;
            case 'Education':
                page = (
                    <EducationSection
                        defaultForm={education}
                        isLoggedIn={isLoggedIn}
                    />
                );
                break;
            case 'Skills':
                page = (
                    <SkillsSection
                        defaultForm={skills}
                        isLoggedIn={isLoggedIn}
                    />
                );
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
                <Nav
                    isLoggedIn={isLoggedIn}
                    activeTab={activeTab}
                    tabHandler={this.tabHandler}
                />
                {page}
            </>
        );
    }
}

export default App;
