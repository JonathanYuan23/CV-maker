import React from 'react';
import InputContainer from './InputContainer';

class PersonalSection extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="personal-section" className={'card-section'}>
                <form>
                    <InputContainer
                        inputFor={'NAME'}
                        placeholder={'First Last'}
                    />
                    <InputContainer
                        inputFor={'PROFESSION'}
                        placeholder={'Software Engineer'}
                    />
                    <InputContainer
                        inputFor={'EMAIL'}
                        placeholder={'xyz@gmail.com'}
                    />
                    <InputContainer
                        inputFor={'PHONE NUMBER'}
                        placeholder={'1-234-567-890'}
                    />
                    <InputContainer
                        inputFor={'WEBSITE'}
                        placeholder={'github.com/xyz'}
                    />
                </form>
            </div>
        );
    }
}

export default PersonalSection;
