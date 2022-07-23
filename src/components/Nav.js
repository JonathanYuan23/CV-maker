import React from 'react';

import TabLink from './TabLink';
import generatePDF from '../utils/generatePDF';

import '../styles/Nav.css';

class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        generatePDF(this.props.isLoggedIn);
    }

    render() {
        const { tabHandler, activeTab } = this.props;
        return (
            <nav id={'navbar'}>
                <ul id={'nav-links'}>
                    <TabLink
                        activeTab={activeTab}
                        tabHandler={tabHandler}
                        linkText={'Personal'}
                    />
                    <TabLink
                        activeTab={activeTab}
                        tabHandler={tabHandler}
                        linkText={'Work'}
                    />
                    <TabLink
                        activeTab={activeTab}
                        tabHandler={tabHandler}
                        linkText={'Education'}
                    />
                    <TabLink
                        activeTab={activeTab}
                        tabHandler={tabHandler}
                        linkText={'Skills'}
                    />
                </ul>
                <button id={'generate-pdf-btn'} onClick={this.clickHandler}>
                    Generate pdf
                </button>
            </nav>
        );
    }
}

export default Nav;
