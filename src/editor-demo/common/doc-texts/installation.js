import React from 'react';
import ReactMarkdown from '../md-helper';

const text =  `\`\`\`
npm install --save @data-driven-forms/react-form-renderer
\`\`\`
or
\`\`\`
yarn add @data-driven-forms/react-form-renderer
\`\`\`
`;

export default <ReactMarkdown source={ text } />;
