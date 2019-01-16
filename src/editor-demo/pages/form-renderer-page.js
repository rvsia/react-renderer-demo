import React, { Component  } from 'react';
import Grid from '@material-ui/core/Grid';
import AceEditor from 'react-ace';
import FormRenderer from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/mui-component-mapper';
import 'brace/mode/jsx';
import 'brace/mode/json';
import 'brace/snippets/json';
import 'brace/theme/monokai';

const baseStructure = {
  fields: [{
    component: 'text-field',
    label: 'First name',
    name: 'firts-name',
  }],
};

class FormRendererPage extends Component {
  state = {
    value: JSON.stringify(baseStructure, null, 2),
    parsedSchema: baseStructure,
  }

  onChange = value => {
    try {
      console.log('value: ', JSON.parse(value));
      this.setState({ parsedSchema: JSON.parse(value) });
    } catch (error) {
      console.warn('not a json', error);
    } finally {
      this.setState({ value });
    }

  }
  render () {
    const { value, parsedSchema } = this.state;
    return (
      <Grid
        container
        spacing={ 16 }
      >
        <Grid
          item
          xs={ 6 }
        >
          <AceEditor
            mode="json"
            theme="monokai"
            onChange={ this.onChange }
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            value={ value }
            fontSize={ 14 }
            showPrintMargin={ true }
            showGutter={ true }
            highlightActiveLine={ true }
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />

        </Grid>
        <Grid
          item
          xs={ 6 }
        >
          <FormRenderer
            formFieldsMapper={ formFieldsMapper }
            layoutMapper={ layoutMapper }
            schema={ parsedSchema }
            onSubmit={ console.log }
          />
        </Grid>
      </Grid>
    );

  }
}

export default FormRendererPage;
