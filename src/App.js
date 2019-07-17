import React from 'react';


const story = {
    id: 0,
    text: 'Baby shoes; never worn.',
    contexts: [
        'This is an ad:',
        'This is actually a short story:',
    ],
    questions: [
        {
            text: 'In one word: how does the ad make you feel?',
            wordLimit: 1,
        },
        {
            text: 'In three words or less: what is the ad about?',
            wordLimit: 3,
        },
    ],
};


function Button(props) {
    return (
        <button onClick={() => props.onClick()}>
            {props.text}
        </button>
    );
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            story: null,
            textInput: '',
            responses: [],
            contextNum: -1,
            questionNum: -1,
        };
    }

    componentDidMount() {
        // TODO: get this via request to the server
        this.setState({
            story,
        });
    }

    handleClick() {
        let questionNum = this.state.questionNum;
        let contextNum = this.state.contextNum;
        const responses = this.state.responses;

        if (questionNum > -1) {
            const valid = this.validateTextInput();
            if (!valid) { 
                alert('Please enter some text, and make sure you respect the word limit.')
                return;
            } else {
                const response = {
                    storyId: this.state.story.id,
                    questionNum,
                    contextNum,
                    text: this.state.textInput.trim(),
                }
                this.setState({
                    responses: responses.concat([response]),
                    textInput: '',
                })

            }
        }

        if (contextNum === -1) {
            contextNum += 1;
        } else {
            if (questionNum < this.state.story.questions.length - 1) {
                questionNum += 1;
            } else {
                questionNum = -1;

                if (contextNum < this.state.story.contexts.length - 1) {
                    contextNum += 1;
                } else {
                    contextNum = -2;
                    questionNum = -2;
                }
            }
        }

        this.setState({
            questionNum,
            contextNum,
        });
    }

    handleTextChange(event) {
        this.setState({textInput: event.target.value});
    }

    validateTextInput() {
        const i = this.state.questionNum;
        const wordLimit = this.state.story.questions[i].wordLimit;
        const text = this.state.textInput;
        if (!text) { return false; } // no input!
        const split = text.trim().split(' '); // remove whitespace, split by ' '
        return split.length <= wordLimit;
    }

    render() {
        const questionNum = this.state.questionNum;
        const contextNum = this.state.contextNum;

        let btnText;
        if (questionNum === -1 && contextNum === -1) {
            btnText = 'Start';
        } else {
            btnText = 'Continue';
        }

        let buttonOrThanks;
        if (contextNum === -2) {
            buttonOrThanks = (
                <div>Thank you for participating!</div>
            );
        } else {
            buttonOrThanks = (
                <div>
                    <Button onClick={() => this.handleClick()} text={btnText} />
                </div>
            );
        }

        let thisQuestion;
        if (questionNum > -1) {
            thisQuestion = this.state.story.questions[questionNum];
        }

        return (
            <div>
                {contextNum > -1 && 
                    <div>
                        <div>{this.state.story.contexts[this.state.contextNum]}</div>
                        <div>{this.state.story.text}</div>
                    </div>
                }

                { thisQuestion && 
                    <div>
                        <div>{thisQuestion.text}</div>
                        <textarea value={this.state.textInput}
                                  onChange={(e) => this.handleTextChange(e)}/>


                    </div>
                }

                { buttonOrThanks }

            </div>
        );
    }
}

export default App;
