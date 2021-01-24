/**
 * author : yangbo
 * date : 2020/06/11 11:27:19
 * fileName: index.jsx
 * description :
 **/
import React from 'react';
class ErrorBoundary extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        // 全局错误监听
        this.setState({ hasError: true });
    }

    render() {
        // if (this.state.hasError) {
        //     return <div>this a wrong</div>;
        // }
        return this.props.children;
    }
}

export default ErrorBoundary;
