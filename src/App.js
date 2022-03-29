import React from 'react';
import Nav from './components/Nav';
import PersonalSection from './components/PersonalSection';
import WorkSection from './components/WorkSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';
import './styles/Reset.css';
import './styles/App.css';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            activeTab: 'Personal',
        };

        this.changeTab = this.changeTab.bind(this);
    }

    changeTab(e) {
        this.setState({
            activeTab: e.currentTarget.textContent,
        });
    }

    render() {
        const { activeTab } = this.state;
        let page;
        // eslint-disable-next-line default-case
        switch (activeTab) {
            case 'Personal':
                page = <PersonalSection />;
                break;
            case 'Work':
                page = <WorkSection />;
                break;
            case 'Education':
                page = <EducationSection />;
                break;
            case 'Skills':
                page = <SkillsSection />;
                break;
        }
        return (
            <>
                <Nav activeTab={activeTab} tabHandler={this.changeTab} />
                {page}
            </>
        );
    }
}

export default App;
