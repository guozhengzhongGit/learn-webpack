
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import { add } from './utils/math';
import { toCamelCase } from './utils/string';

import './index.less';
import { rem } from './utils/rem';
import example from 'assets/example.jpg';

const Image = () => <img src={example} />
class Index extends PureComponent {
  state = {
    Comp: null
  }
  render() {
    const { comp } = this.state
  return (
    <div>
      <h1 className="title">{add(1, 1)}</h1>
      <h1>{toCamelCase('hello-world')}</h1>
      <span>update</span>
      <p>{TWO}<br />{typeof window}</p>
      <div className="img"><Image /></div>
      
    </div>
  )
  }
}

ReactDOM.render (
  <Index />,
  document.getElementById('root')
)