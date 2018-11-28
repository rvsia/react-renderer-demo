import React from 'react';

class Pf3Mapper extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    console.log('will mount');
  }
  componentWillUnmount(){
    console.log('will unmount');
  }
  render() {
    return (
      <div>
        Pf 3 mapper
      </div>
    );
  }
}

export default Pf3Mapper;
