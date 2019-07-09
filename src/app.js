import React from 'react';
import ReactDOM from 'react-dom';
import autoBind from 'react-autobind';

import {UploadPhoto} from './main';

class Test extends React.Component{
    constructor(props) {
        super(props);
        autoBind(this);
        this.state={
            visible: false
        }
    }
    handleChange() {
        this.setState({
            visible: true
        })
    }
    onCancel() {
        this.setState({
            visible: false
        })
    }
    render() {
        const { visible } = this.state;
        return <UploadPhoto
            max_length={3}
            multiple={false}
            type="JPEG, jpg"
            size={2}
            onPreview={this.handleChange}
            onCancel={this.onCancel}
            disabled={false}
            visible={visible}
            isRotate={false}
        />
    }
}

ReactDOM.render(<Test/>, document.getElementById('app'));