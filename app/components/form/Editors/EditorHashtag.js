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

const HANDLE_REGEX = /\@[\w]+/g;
const HASHTAG_REGEX = /\S*#(?:\[[^\]]+\]|\S+)/g;
/*
 \S*                # any number of non-white space characters
 #                  # matches #
 (?:                # start non-capturing group
 \[             # matches [
 [^\]]+         # any character but ], one or more
 \]             # matches ]
 |              # OR
 \S+            # one or more non-white space characters
 )                  # end non-capturing group
 */
const HANDLE_LINK = /\http:\/\/(?:\[[^\]]+\]|\S+)/g;


function handleStrategy(contentBlock, callback) {
    findWithRegex(HANDLE_REGEX, contentBlock, callback);
}

function hashtagStrategy(contentBlock, callback) {
    findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

function handleLink(contentBlock, callback) {
    findWithRegex(HANDLE_LINK, contentBlock, callback);
}


function findWithRegex(regex, contentBlock, callback) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
}

const HandleSpan = (props) => {
    return <span {...props} style={styles.handle}>{props.children}</span>
}

const HashtagSpan = (props) => {
    return <span {...props} style={styles.hashtag}>{props.children}</span>
}

const HandleLinkSpan = (props) => {
    let href = props.children[0].props.text;
    return <a href={href}>{props.children}</a>
}

function myBlockStyleFn(contentBlock){
    const type = contentBlock.getType();
    console.log(type);
    if(type === 'blockquote'){
        return 'superFancyBlockquote'
    }
}

export default class EditorHashtag extends React.Component {
    constructor(props) {
        super(props);

        const decorator = new CompositeDecorator([
            {
                strategy: hashtagStrategy,
                component: HashtagSpan
            },
            {
                strategy: handleStrategy,
                component: HandleSpan
            },{
                strategy: handleLink,
                component: HandleLinkSpan
            }
        ]);

        let contentState = ContentState.createFromText('http://thanhtungdp.com');

        this.state = {
            editorState: EditorState.createWithContent(contentState, decorator)
        };
        this.onChange = (editorState) => this.setState({editorState});
        this.focus = () => {
            console.log('focus');
            this.refs.editor.focus();
        }
        this.logState = () => {
            console.log(this.state.editorState.getCurrentContent());
            console.log(ContentState.createFromText('ok i i love it'));
        }
    }

    _confirmUnderline(e) {
        e.preventDefault();
        const entityKey = Entity.create('UNDERLINE', 'MUTABLE');
        this.setState({
            editorState: RichUtils.toggleLink(
                this.state.editorState,
                this.state.editorState.getSelection(),
                entityKey
            )
        });
    }

    render() {
        const {editorState} = this.state;
        return (
            <div>
                <div style={styles.editor} onClick={this.focus}>
                    <Editor editorState={editorState}
                            onChange={this.onChange}
                            placeholder="Enter some text ..."
                            ref="editor"
                            blockStyleFn = {myBlockStyleFn}
                            readOnly={false}
                            contentEditable={true}
                            disableContentEditableWarning
                            suppressContentEditableWarning
                    />
                </div>
            </div>
        )
    }
}


const styles = {
    handle: {
        color: 'blue'
    },
    hashtag: {
        color: 'green'
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10
    }
}
