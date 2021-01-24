import React from 'react';
import styles from './index.less';

// 个人信息
import userConfig from '@rules/userConfig';

const BaseProps = {
    position: 'static',
    top: null,
    left: null,
    bgColor: null,
};

function Nav(props = BaseProps) {
    return (
        <div className={styles.nav}>
            <h1>
                <span>{userConfig.userName}</span>
                <sub>{userConfig.describe}</sub>
            </h1>
        </div>
    );
}

export default Nav;
