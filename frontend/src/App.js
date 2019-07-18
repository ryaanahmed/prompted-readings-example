import React from 'react';


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

    async componentDidMount() {
        try {
            const url = 'http://localhost:8000/readings/story/1';
            const res = await fetch(url);
            const story = await res.json();
            this.setState({
                story
            });
        } catch (e) {
          alert(e);
        }
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
                    // TODO(ra): send responses back to the server
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

        let buttonOrResponses;
        if (contextNum === -2) {
            const responseList = this.state.responses.map((response, i) => 
                <li key={i}>{response.text}</li>
            );

            buttonOrResponses = (
                <div>
                Thank you for participating! Your responses were: 
                <ul>{responseList}</ul>
                </div>
            );

        } else {
            let btnText;
            if (questionNum === -1 && contextNum === -1) {
                btnText = 'Start';
            } else {
                btnText = 'Continue';
            }

            buttonOrResponses = (
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

                { buttonOrResponses }

            </div>
        );
    }
}

export default App;
