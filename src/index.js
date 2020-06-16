
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import { add } from './utils/math';
import { toCamelCase } from './utils/string';

import './index.less';
import example from 'assets/example.jpg';
import test from 'assets/test.jpg';

// import Image from 'components/Image'
class Index extends PureComponent {
  state = {
    Comp: null
  }
  loadImg = () => {
    import(/* webpackChunkName: "asyncImage" */ 'components/Image').then(({default: Comp}) => {
      this.setState({
        Comp
      })
    })
  }
  render() {
    const { Comp } = this.state;
    return (
      <div>
        <h1 className="title">{add(1, 1)}</h1>
        <h1>{toCamelCase('hello-world')}</h1>
        <span>update</span>
        <p>{TWO}<br />{typeof window}</p>
        <button onClick={this.loadImg}>加载图片</button>
        <div className="img">{Comp ? <Comp src={example} /> : null}</div>
      </div>
    )
  }
}

ReactDOM.render (
  <Index />,
  document.getElementById('root')
)