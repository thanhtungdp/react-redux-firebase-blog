import React from 'react';
import ReactDOM from 'react-dom';
import {
    Editor, EditorState, ContentState, RichUtils,
    getDefaultKeyBinding, KeyBindingUtil,
    Entity, convertToRaw, CompositeDecorator,
    AtomicBlockUtils, Modifier
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

function myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    console.log(type);
    if (type === 'blockquote') {
        return 'superFancyBlockquote'
    }
}

export default class EditorRich extends React.Component {
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
            }, {
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

    _addMedia(type) {
        const src = 'https://dl4rygnmrir77.cloudfront.net/muzli_feed/wp-content/uploads/2016/05/02001335/Screenshot-at-May-02-00-12-42.png'
        const entityKey = Entity.create(type, 'IMMUTABLE', {src});

        return AtomicBlockUtils.insertAtomicBlock(
            this.state.editorState,
            entityKey,
            ' '
        )
    }

    _toggleBlockType(blockType){
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        )
    }

    _toggleInlineStyle(inlineStyle){
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        )
    }

    handleKeyCommand(command){
        const newState = RichUtils.toggleBlockType(this.state.editorState, command);
        console.log(command);
        this.onChange(newState);
    }

    handleTab(e){
        console.log(e);
        e.preventDefault();
        let contentState = this.state.editorState.getCurrentContent();
        let targetRange = this.state.editorState.getSelection();
        let newContentState = Modifier.insertText(
            contentState,
            targetRange,
            '\t'
        );
        let editorState = EditorState.push(
            this.state.editorState,
            newContentState
        );

        this.onChange(editorState)
        this.focus();
    }

    render() {
        const {editorState} = this.state;

        let className='RichEditor-editor';
        var contentState  = editorState.getCurrentContent();
        if(!contentState.hasText()){
            if(contentState.getBlockMap().first().getType() !== 'unstyled'){
                className += ' RichEditor-hidePlaceholder';
            }
        }
        return (
            <div>
                <BlockStyleControls editorState={editorState} onToggle={this._toggleBlockType.bind(this)}/>
                <InlineStyleControls editorState={editorState} onToggle={this._toggleInlineStyle.bind(this)}/>
                <div style={styles.editor} onClick={this.focus}>
                    <Editor editorState={editorState}
                            onChange={this.onChange}
                            placeholder="Enter some text ..."
                            blockStyleFn={getBlockStyle}
                            customStyleMap={styleMap}
                            handleKeyCommand={this.handleKeyCommand.bind(this)}
                            onTab={this.handleTab.bind(this)}
                            keyBindingFn={myKeyBindingFn}
                            ref="editor"
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

function myKeyBindingFn(e: SyntheticKeyboardEvent): string{
    if(e.keyCode ==69 && KeyBindingUtil.hasCommandModifier(e)){
        return 'code-block';
    }
    return getDefaultKeyBinding(e);
}

const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'Richeditor-blockquote';
        default:
            return null;
    }
}

class StyleButton extends React.Component {
    constructor() {
        super(...arguments);
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style)
        }
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }
        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        )
    }
}

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'blockquote', style: 'blockquote'},
    {label: 'Code block', style: 'code-block'}
]

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map(type =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    )
}

var INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
    const {editorState} = props;
    const curentStyle = editorState.getCurrentInlineStyle();
    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={curentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    )
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
