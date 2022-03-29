import React from 'react';
import Nav from './components/Nav';
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
        return (
            <>
                <Nav activeTab={activeTab} tabHandler={this.changeTab} />
            </>
        );
    }
}

export default App;
