
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import { add } from './utils/math';
import { toCamelCase } from './utils/string';

import './index.less';
import { rem } from './utils/rem';
class Index extends PureComponent {
  render() {
  return (
    <div>
      <h1 className="title">{add(1, 1)}</h1>
      <h1>{toCamelCase('hello-world')}</h1>
      <span>update</span>
    </div>
  )
  }
}

ReactDOM.render (
  <Index />,
  document.getElementById('root')
)