import React, { Component  } from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import AceEditor from 'react-ace';
import FormRenderer from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/mui-component-mapper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import PropTypes from 'prop-types';
import { baseExamples } from './examples-definitions';
import { validatorTypes } from '@data-driven-forms/react-form-renderer'

import 'brace/mode/jsx';
import 'brace/mode/json';
import 'brace/snippets/json';
import 'brace/theme/monokai';

class ComponentExample extends Component {
  constructor(props) {
    super(props);
    const baseStructure = baseExamples.find(item => item.component === props.match.params.component);
    this.state = {
      ...baseStructure,
      value: JSON.stringify(baseStructure.value, null, 2),
      parsedSchema: baseStructure.value,
    };
  }

  componentDidUpdate({ match: { params: { component }}}){
    if (component !== this.props.match.params.component) {
      const baseStructure = baseExamples.find(item => item.component === this.props.match.params.component);
      this.setState({
        ...baseStructure,
        value: JSON.stringify(baseStructure.value, null, 2),
        parsedSchema: baseStructure.value,
      });
    }
  }

  handleExampleVariantChange = (value, index) => this.setState(prevState =>({
    ...prevState,
    variants: prevState.variants.map((item, i) => {
      if (i !== index) {
        return item;
      }

      return { ...item, value };
    }),
  }),
  () => this.setState(prevState =>
    ({ value: JSON.stringify({
      ...JSON.parse(prevState.value),
      fields: JSON.parse(prevState.value).fields.map(item => ({
        ...item,
        ...prevState.variants.reduce((acc, curr) => ({
          ...acc,
          [curr.name]: curr.value,
          validate: curr.name === 'isRequired' && curr.value === false ? acc.validate.filter(({ type }) => type === validatorTypes.REQUIRED) : curr.validate ? [ ...acc.validate, ...curr.validate ] : [ ...acc.validate ],
        }), { validate: []}),
      })),
    }, null, 2),
    }),
  () => this.setState({ parsedSchema: JSON.parse(this.state.value) })),
  )

  renderActions = (actions) => actions.map(({ name, options, title, ...rest }, index) => {
    if (options) {
      return (
        <FormGroup key={ name }>
          <FormControl>
            <InputLabel htmlFor="age-simple">Age</InputLabel>
            <Select
              value={ rest.value || '' }
              onChange={ ({ target: { value }}) => this.handleExampleVariantChange(value, index) }
              inputProps={{
                name,
                id: name,
              }}
            >
              { options.map(option => (<MenuItem key={ option } value={ option }>{ option }</MenuItem>)) }
            </Select>
          </FormControl>
        </FormGroup>
      );
    }

    return (
      <FormGroup key={ name }>
        <FormControlLabel
          control={ <Checkbox
            checked={ this.state.checkedB }
            onChange={ (_e, value) => this.handleExampleVariantChange(value, index) }
            value="checkedB"
            color="primary"
          /> }
          label="Primary"
        />
      </FormGroup>
    );
  })

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
          xs={ 5 }
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
        <Grid item xs={ 2 }>
          { this.renderActions(this.state.variants) }
        </Grid>
        <Grid
          item
          xs={ 5 }
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

ComponentExample.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      component: PropTypes.string,
    }),
  }),
};

export default withRouter(ComponentExample);
