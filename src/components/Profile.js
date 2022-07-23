import React from 'react';
import { ReactComponent as CaretIcon } from '../icons/Caret down.svg';
import { ReactComponent as SaveIcon } from '../icons/Save.svg';
import { ReactComponent as LogoutIcon } from '../icons/Logout.svg';

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

export { ProfileButton, ProfileTooltip };
