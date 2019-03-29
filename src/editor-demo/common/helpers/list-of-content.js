import React from 'react';
import ReactMarkdown from '../md-helper';

export default ({ text }) => {
  const regex = /###(.*)/gm;
  const found = text.match(regex);
  return <React.Fragment>
    <ReactMarkdown source={ '### Table of content' }/>
    { found.map((header, index) => (
      <ReactMarkdown key={ header } source={ `[${header.replace('###', '')}](#${header.replace('### ', '').replace(' ', '-').toLowerCase()})` }/>
    )) }
  </React.Fragment>;
};

