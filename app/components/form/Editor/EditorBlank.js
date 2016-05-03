import React from 'react';
import ReactDOM from 'react-dom';
import {
    Editor, EditorState, ContentState, RichUtils,
    getDefaultKeyBinding, KeyBindingUtil,
    Entity, convertToRaw, CompositeDecorator
} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

/**
 * Setup hot keybinding
 * Cmd + S
 * @param e
 * @returns {*}
 */
function myKeyBindingFn(e: SyntheticKeyboardEvent): string{
    if(e.keyCode == 83 && KeyBindingUtil.hasCommandModifier(e)){
        return 'save';
    }
    return getDefaultKeyBinding(e);
}


export default class EditorBlank extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty()
            //editorState: ContentState.createFromText('ok i i love it');
            //create from text
        };

        this.onChange = (editorState) => this.setState({editorState});
        this.focus = () => this.refs.editor.focus();
        this.logState = () => {
            console.log(this.state.editorState.getCurrentContent());
        }
    }

    handleKeyCommand(command){
        const newState= RichUtils.handleKeyCommand(this.state.editorState, command);
        console.log(command);
        if(newState){
            this.onChange(newState);
            return true;
        }
        return false;
    }

    handleKeyDown(command){
        console.log(command)
    }

    _onBoldClick(){
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }

    render() {
        const {editorState} = this.state;
        return (
            <div>
                <div>
                    {stateToHTML(this.state.editorState.getCurrentContent())}
                </div>
                <button onClick={this._onBoldClick.bind(this)}>Bold</button>
                <div onClick={this.focus.bind(this)} style={styles.editor}>
                    <Editor editorState={editorState}
                            onChange={this.onChange}
                            handleKeyCommand={this.handleKeyCommand.bind(this)}
                            placeholder="Enter some text ..."
                            keyBindingFn={myKeyBindingFn}
                            ref="editor"/>
                </div>
                <button bStyle="primary" onClick={this.logState.bind(this)}>Log state</button>
            </div>
        )
    }
}

const styles = {
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10
    }
}
