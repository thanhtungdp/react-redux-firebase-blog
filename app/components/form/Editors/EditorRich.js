import React from 'react';
import ReactDOM from 'react-dom';
import {
    Editor, EditorState, ContentState, RichUtils,
    getDefaultKeyBinding, KeyBindingUtil,
    Entity, convertToRaw, CompositeDecorator,
    convertFromRaw,
    AtomicBlockUtils, Modifier
} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

const HANDLE_LINK = /\http:\/\/(?:\[[^\]]+\]|\S+)/g;

function handleLink(contentBlock, callback) {
    findWithRegex(HANDLE_LINK, contentBlock, callback);
}

const HandleLinkSpan = (props) => {
    let href = props.children[0].props.text;
    return <a href={href}>{props.children}</a>
}


function findWithRegex(regex, contentBlock, callback) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
}

export default class EditorRich extends React.Component {
    constructor(props) {
        super(props);

        this.decorator = new CompositeDecorator([
            {
                strategy: handleLink,
                component: HandleLinkSpan
            }
        ]);

        this.state = {
            editorState: EditorState.createEmpty(this.decorator)
        };
        this.onChange = (editorState) => {
            this.setState({editorState});
            let contentState = editorState.getCurrentContent();

            if (contentState.getPlainText()) {
                this.props.onChange(convertToRaw(contentState));
            }
            else {
                this.props.onChange(null);
            }
        }
        this.focus = () => {
            //this.refs.editor.focus();
        }
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        )
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        )
    }

    handleKeyCommand(command) {
        const newState = RichUtils.toggleBlockType(this.state.editorState, command);
        this.onChange(newState);
    }

    handleTab(e) {
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

    componentDidMount() {
        if (this.props.defaultContentState) {
            let newRawContent = {...this.props.defaultContentState, entityMap: {}}
            let newContentState = convertFromRaw(newRawContent);
            this.onChange(EditorState.createWithContent(newContentState, this.decorator));
        }
    }

    render() {
        const {editorState} = this.state;

        let className = !this.props.readOnly ? 'RichEditor-editor' : null;
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        return (
            <div className={!this.props.readOnly ? 'RichEditor-root':null}>
                {!this.props.readOnly &&
                <div>
                    <BlockStyleControls editorState={editorState} onToggle={this._toggleBlockType.bind(this)}/>
                    <InlineStyleControls editorState={editorState} onToggle={this._toggleInlineStyle.bind(this)}/>
                </div>
                }
                <div className={className} onClick={this.focus}>
                    <Editor editorState={editorState}
                            onChange={this.onChange}
                            placeholder="Enter some text ..."
                            customStyleMap={styleMap}
                            handleKeyCommand={this.handleKeyCommand.bind(this)}
                            onTab={this.handleTab.bind(this)}
                            keyBindingFn={myKeyBindingFn}
                            ref="editor"
                            readOnly={this.props.readOnly}
                            contentEditable={true}
                            disableContentEditableWarning
                            suppressContentEditableWarning
                    />
                </div>
            </div>
        )
    }
}

function myKeyBindingFn(e:SyntheticKeyboardEvent):string {
    if (e.keyCode == 69 && KeyBindingUtil.hasCommandModifier(e)) {
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
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
];

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

EditorRich.defaultProps = {
    onChange: () => {

    }
}