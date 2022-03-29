import React from 'react';
import InputContainer from './InputContainer';

class SkillsSection extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="skills-section" className={'card-section'}>
                <form>
                    <InputContainer
                        inputFor={'TITLE'}
                        placeholder={'Languages'}
                    />
                    <InputContainer
                        inputFor={'DESCRIPTION'}
                        placeholder={'Java, C++, Python'}
                    />
                </form>
            </div>
        );
    }
}

export default SkillsSection;
