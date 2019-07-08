import React from 'react';
import ReactDOM from 'react-dom';

import {UploadPhoto} from './main';


ReactDOM.render(<UploadPhoto max_length={3} multiple={false}/>, document.getElementById('app'));