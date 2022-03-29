import React from 'react';
import InputContainer from './InputContainer';

class WorkSection extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="work-section" className={'card-section'}>
                <form>
                    <InputContainer
                        inputFor={'TITLE'}
                        placeholder={'Software Engineer'}
                    />
                    <InputContainer
                        inputFor={'COMPANY'}
                        placeholder={'Google'}
                    />
                    <InputContainer
                        inputFor={'LOCATION'}
                        placeholder={'San Francisco'}
                    />
                    <InputContainer
                        inputFor={'START DATE'}
                        placeholder={'2019'}
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

export default WorkSection;
