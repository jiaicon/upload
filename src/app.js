import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';
import autoBind from 'react-autobind';
import { UploadPhoto } from './main';

class Test extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
    };
  }

  render() {
    return (
      <UploadPhoto
        isRotate />
    );
  }
}

ReactDOM.render(<Test />, document.getElementById('app'));
