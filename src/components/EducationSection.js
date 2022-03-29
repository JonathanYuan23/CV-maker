import React from 'react';
import InputContainer from './InputContainer';

class EducationSection extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="education-section" className={'card-section'}>
                <form>
                    <InputContainer
                        inputFor={'DEGREE'}
                        placeholder={'BSc. Honours CS'}
                    />
                    <InputContainer
                        inputFor={'INSTITUTION'}
                        placeholder={'UWaterloo'}
                    />
                    <InputContainer
                        inputFor={'LOCATION'}
                        placeholder={'Waterloo, Ontario'}
                    />
                    <InputContainer
                        inputFor={'START DATE'}
                        placeholder={'2022'}
                    />
                    <InputContainer
                        inputFor={'END DATE'}
                        placeholder={'Present'}
                    />
                    <InputContainer
                        inputFor={'DESCRIPTION'}
                        placeholder={
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porttitor.'
                        }
                    />
                </form>
            </div>
        );
    }
}

export default EducationSection;
