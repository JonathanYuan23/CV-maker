import React from 'react';
import '../styles/Nav.css';

class Nav extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { tabHandler, activeTab } = this.props;
        return (
            <nav id={'navbar'}>
                <ul id={'nav-links'}>
                    <li
                        className={`${
                            activeTab === 'Personal' ? 'active-tab ' : ''
                        }tab-link`}
                        onClick={tabHandler}
                    >
                        Personal
                    </li>
                    <li
                        className={`${
                            activeTab === 'Work' ? 'active-tab ' : ''
                        }tab-link`}
                        onClick={tabHandler}
                    >
                        Work
                    </li>
                    <li
                        className={`${
                            activeTab === 'Education' ? 'active-tab ' : ''
                        }tab-link`}
                        onClick={tabHandler}
                    >
                        Education
                    </li>
                    <li
                        className={`${
                            activeTab === 'Skills' ? 'active-tab ' : ''
                        }tab-link`}
                        onClick={tabHandler}
                    >
                        Skills
                    </li>
                </ul>
                <button id="generate-pdf-btn">Generate pdf</button>
            </nav>
        );
    }
}

export default Nav;
