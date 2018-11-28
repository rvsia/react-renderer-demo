import React from 'react';

class Pf4Mapper extends React.Component {
  constructor(props) {
    super(props);
    const cssId = 'pf4css';  // you could encode the css path itself to generate id..
    if (!document.getElementById(cssId))
    {
      let head  = document.getElementsByTagName('head')[0];
      let link  = document.createElement('link');
      link.id   = cssId;
      link.rel  = 'stylesheet';
      link.type = 'text/css';
      link.href = '/vendor4.css';
      link.media = 'all';
      head.appendChild(link);
    }

    this.state = {
      cssId,
    };
  }
  componentWillUnmount(){
    const pf4LinkTag = document.getElementById(this.state.cssId);
    pf4LinkTag.parentNode.removeChild(pf4LinkTag);
  }
  render() {
    return (
      <div>
        Pf 4 mapper
      </div>
    );
  }
}

export default Pf4Mapper;
