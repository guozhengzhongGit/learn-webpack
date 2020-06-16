import React from 'react';

export default class Image extends React.PureComponent {
  render() {
    const { src } = this.props
    return (
      <img src={src} />
    )
  }
}