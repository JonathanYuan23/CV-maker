import React from 'react';
import InputContainer from './InputContainer';
import '../styles/PersonalSection.css';

class PersonalSection extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="personal-section">
                <form>
                    <InputContainer inputFor="NAME" placeholder="First Last" />
                    <InputContainer
                        inputFor="PROFESSION"
                        placeholder="Software Engineer"
                    />
                    <InputContainer
                        inputFor="EMAIL"
                        placeholder="xyz@gmail.com"
                    />
                    <InputContainer
                        inputFor="PHONE NUMBER"
                        placeholder="1-234-567-890"
                    />
                    <InputContainer
                        inputFor="WEBSITE"
                        placeholder="github.com/xyz"
                    />
                </form>
            </div>
        );
    }
}

export default PersonalSection;
