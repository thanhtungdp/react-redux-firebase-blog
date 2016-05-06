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
function myKeyBindingFn(e:SyntheticKeyboardEvent):string {
    if (e.keyCode == 83 && KeyBindingUtil.hasCommandModifier(e)) {
        return 'save';
    }
    return getDefaultKeyBinding(e);
}

const findLinkEntities = (contentBlock, callback) => {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                Entity.get(entityKey).getType() === 'LINK'
            )
        },
        callback
    )
}

const Link = (props) => {
    const {url} = Entity.get(props.entityKey).getData();
    return (
        <a href={url}>
            {props.children}
        </a>
    )
}

const findUnderlineEntities = (contentBlock,callback) => {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                Entity.get(entityKey).getType() === 'UNDERLINE'
            )
        },
        callback
    )
}

const Underline = (props) => {
    return (
        <u>{props.children}</u>
    )
}


export default class EditorLink extends React.Component {
    constructor(props) {
        super(props);

        const decorator = new CompositeDecorator([
            {
                strategy: findLinkEntities,
                component: Link
            },
            {
                strategy: findUnderlineEntities,
                component: Underline
            }
        ]);

        this.state = {
            editorState: EditorState.createEmpty(decorator)
        };
        this.onChange = (editorState) => this.setState({editorState});
        this.focus = () => this.refs.editor.focus();
        this.logState = () => {
            console.log(this.state.editorState.getCurrentContent());
            console.log(ContentState.createFromText('ok i i love it'));
        }
    }

    handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        console.log(command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }

    _confirmLink(e) {
        e.preventDefault();
        const {editorState} = this.state;
        const entityKey = Entity.create('LINK', 'SEGMENTED', {url: 'http://gamestudio.vn/public/img/logo.png'});
        console.log(editorState.getSelection());
        this.setState({
            editorState: RichUtils.toggleLink(
                editorState,
                editorState.getSelection(),
                entityKey
            )
        }, ()=> {
            console.log('focus');
            setTimeout(()=> this.refs.editor.focus(), 0);
        });
    }

    _confirmUnderline(e){
        e.preventDefault();
        const entityKey =Entity.create('UNDERLINE','MUTABLE');
        this.setState({
            editorState: RichUtils.toggleLink(
                this.state.editorState,
                this.state.editorState.getSelection(),
                entityKey
            )
        });
    }
    /*<div>
     {stateToHTML(this.state.editorState.getCurrentContent())}
     </div>
     <button onClick={this._confirmUnderline().bind(this)}>Underline</button>
     <div onClick={this.focus.bind(this)} style={styles.editor}>
     <Editor editorState={editorState}
     onChange={this.onChange}
     handleKeyCommand={this.handleKeyCommand.bind(this)}
     placeholder="Enter some text ..."
     keyBindingFn={myKeyBindingFn}
     ref="editor"/>
     </div>
     <button bStyle="primary" onClick={this.logState.bind(this)}>Log state</button>*/
    render() {
        const {editorState} = this.state;
        return (
            <div>
                <button type="button" onClick={this._confirmUnderline.bind(this)}>Underline</button>

                <button onClick={this._onBoldClick.bind(this)}>Bold</button>
                <button type="button" onClick={this._confirmLink.bind(this)}>Add l dsink</button>
                <div style={styles.editor}>
                    <Editor editorState={editorState}
                            onChange={this.onChange}
                            handleKeyCommand={this.handleKeyCommand.bind(this)}
                            placeholder="Enter some text ..."
                            keyBindingFn={myKeyBindingFn}
                            ref="editor"
                            contentEditable={true}
                            disableContentEditableWarning
                            suppressContentEditableWarning
                    >
                        Heleo
                    </Editor>
                </div>

                Hello
            </div>
        )
    }
    //render(){
    //    return (
    //        <div>
    //            Hello
    //            <Editor editorState={this.state.editorState}
    //                    placeholder="Enter some text ..."
    //                    ref="editor"/>
    //        </div>
    //    )
    //}
}

const styles = {
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10
    }
}
