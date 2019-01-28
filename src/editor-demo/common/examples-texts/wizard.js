import React from 'react';
import ReactMarkdown from '../md-helper';

const text =  `This a custom component.

Submit will contain values only from active steps. (If a user goes back and changes the way, values from left steps won't be submitted.)

<br>

**PROPS**

<br>

As a fields it needs an array of objects which contain:

- **title, name**

- **stepKey**

\'1\' - for the first step object.

Otherwise, use a custom name which will be used as a link for the step.

- **nextStep**

Here you can **branch** your way using \`when\` key:

\`When\` key takes a name of a field where is stored a value which decides where the way will lead to.

If you are using this key, you have to provide \`stepMapper\` key where you store an object: key is the value of the field stored in \`when\` field and the value is a \`stepKey\` of next wizard step.


<br>


If you don't need to branch the way, you can just use a name of next wizard step.

- **fields** 

A content of the wizard step (as usual.)`;

export default () => <ReactMarkdown source={ text } />;
