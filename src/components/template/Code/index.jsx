import React, { useEffect, useMemo, useRef } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import classNames from 'classnames';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';

function Code(props) {
    const { code } = props;
    const classname = useMemo(() => {
        return classNames({
            [styles.code_panel]: true,
            [styles.code_open]: code,
            [styles.code_close]: !code,
        });
    }, [code]);
    const code_content = useRef(null);
    const monacoEditor = useRef(null);

    // 初始化代码编辑器
    useEffect(() => {
        if (code_content.current) {
            console.log(monaco);
            monacoEditor.current = monaco.editor.create(code_content.current, {
                value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
                language: 'javascript',
                automaticLayout: true,
                theme: 'vs-white',
            });

            console.log(monacoEditor.current);

            // 监听内容变更
            monacoEditor.current.onDidChangeModelContent(e => {
                console.log(e);
            });

            // 监听失去光标处理
            monacoEditor.current.onDidBlurEditorWidget(e => {
                console.log(e);
            });
        }

        return () => {
            monacoEditor.current.dispose();
        };
    });

    return (
        <div className={classname}>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                }}
                ref={code_content}
            ></div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        code: state.global.code,
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Code);
