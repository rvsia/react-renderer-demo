import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import AceEditor from 'react-ace';
import FormRenderer from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/mui-component-mapper';
import { formFieldsMapper as pf4FormFieldsMapper, layoutMapper as pf4LayoutMapper } from '@data-driven-forms/pf4-component-mapper';
import { formFieldsMapper as pf3FormFieldsMapper, layoutMapper as pf3LayoutMapper } from '@data-driven-forms/pf3-component-mapper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import PropTypes from 'prop-types';
import { baseExamples } from './examples-definitions';
import { validatorTypes } from '@data-driven-forms/react-form-renderer';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Frame from 'react-frame-component';

import 'brace/mode/jsx';
import 'brace/mode/json';
import 'brace/snippets/json';
import 'brace/theme/monokai';

// Text inputs are first, then all other actions are sorted by title
const comparator = (a, b) => {
  if (a.component === 'input') {
    if (a.component !== b.component) {
      return -1;
    }
  } else if (b.component === 'input') {
    return 1;
  }

  if (a.title < b.title) {return -1;}

  if (a.title > b.title) {return 1;}

  return 0;
};

const mapperVariants = {
  mui: { formFieldsMapper, layoutMapper },
  pf4: { formFieldsMapper: pf4FormFieldsMapper, layoutMapper: pf4LayoutMapper },
  pf3: { formFieldsMapper: pf3FormFieldsMapper, layoutMapper: pf3LayoutMapper },
};

class ComponentExample extends Component {
  constructor(props) {
    super(props);
    window.magix = this.frameRef;
    const baseStructure = baseExamples.find(item => item.component === props.match.params.component);
    this.state = {
      ...baseStructure,
      value: JSON.stringify(baseStructure.value, null, 2),
      parsedSchema: baseStructure.value,
      activeMapper: 'mui',
      frameHeight: 360,
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

  handleMapperChange = (_event, value) => {
    this.setState({ activeMapper: value });
  }

  handleExampleVariantChange = (value, index) => this.setState(prevState => {
    const variants = prevState.variants.map((item, i) => {
      if (i !== index) {
        return item;
      }

      return { ...item, value };
    });

    const previousValue = JSON.parse(prevState.value);
    const newVariants = variants.reduce((acc, curr) => {
      return ({
        ...acc,
        [curr.name]: curr.value,
        validate: curr.name === 'isRequired' && !curr.value ? acc.validate.filter(({ type }) =>
          type === validatorTypes.REQUIRED) : curr.validate ? [ ...acc.validate, ...curr.validate ] : [ ...acc.validate ],
      });}, { validate: []});
    const newValue = { ...previousValue, fields: previousValue.fields.map(item => ({
      ...item,
      ...newVariants,
    })) };
    const newState = {
      variants,
      value: JSON.stringify(newValue, null, 2),
      parsedSchema: newValue,
    };

    return newState;
  });

  renderActions = (actions) => actions.length === 0 ? <Typography variant="h6">No props</Typography> :
    actions.sort(comparator).map(({ name, options, title, component }, index) => {
      if (options) {
        return (
          <FormGroup key={ name }>
            <FormControl>
              <InputLabel htmlFor={ name }>{ title }</InputLabel>
              <Select
                value={ this.state.variants[index].value || '' }
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

      if (component === 'input'){
        return (
          <TextField
            key={ name }
            id={ name }
            label={ title }
            value={ this.state.variants[index].value || '' }
            onChange={ ({ target: { value }}) => this.handleExampleVariantChange(value, index) }
            margin="normal"
          />
        );
      }

      return (
        <FormGroup key={ name }>
          <FormControlLabel
            control={ <Checkbox
              checked={ this.state.variants[index].value || false }
              onChange={ (_e, value) => this.handleExampleVariantChange(value, index) }
              value="checkedB"
              color="primary"
            /> }
            label={ title }
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
    const { value, parsedSchema, linkText, ContentText, activeMapper, component } = this.state;
    const frameContents = {
      pf3: {
        head: <link key="1" rel="stylesheet" type="text/css" href="/vendor.css" onLoad={ () => {
          const elem = document.getElementById('frame-form-wrapper');
          elem.style.height = `${elem.contentWindow.document.body.scrollHeight}px`;
        } } />,
      },
      pf4: {
        head: <link rel="stylesheet" type="text/css" href="/vendor4.css" onLoad={ () => {
          const elem = document.getElementById('frame-form-wrapper');
          elem.style.height = `${elem.contentWindow.document.body.scrollHeight}px`;
        } } />,
      },
    };
    return (
      <Grid
        container
        spacing={ 16 }
      >
        <Grid item xs={ 12 } >
          <Typography variant="h4" gutterBottom>
            { linkText }
          </Typography>

        </Grid>
        <Grid item xs={ 4 } >
          <Typography variant="h5" gutterBottom>
              Schema
          </Typography>
        </Grid>
        <Grid item xs={ 3 } >
          <Typography variant="h5" gutterBottom>
              Props
          </Typography>
        </Grid>
        <Grid item xs={ 5 } >
          <Typography variant="h5" gutterBottom>
              Preview
          </Typography>
        </Grid>
        <Grid item xs={ 4 } >
          <AceEditor
            readOnly
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
            style={{ width: '100%' }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </Grid>
        <Grid item xs={ 3 }>
          <Card square>
            <CardContent>
              { this.renderActions(this.state.variants) }
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={ 5 } >
          <Card square style={{ overflow: 'initial' }}>
            <div style={{ padding: 8 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Component mapper</FormLabel>
                <RadioGroup
                  aria-label="component-mapper"
                  name="component-mapper"
                  value={ this.state.activeMapper }
                  onChange={ this.handleMapperChange }
                  style={{ flexDirection: 'row' }}
                >
                  <FormControlLabel value="mui" control={ <Radio /> } label="MUI" />
                  <FormControlLabel value="pf3" control={ <Radio /> } label="PF3" />
                  <FormControlLabel value="pf4" control={ <Radio /> } label="PF4" />
                </RadioGroup>
              </FormControl>
            </div>
            <CardContent>
              { this.state.activeMapper === 'mui' ?
                <div style={{ paddingLeft: 8 }}>
                  <FormRenderer
                    { ...mapperVariants[this.state.activeMapper] }
                    schema={ parsedSchema }
                    onSubmit={ console.log }
                  />
                </div>
                :
                <div style={{ position: 'relative' }}>
                  <Frame
                    contentDidUpdate={ () => {
                      const elem = document.getElementById('frame-form-wrapper');
                      elem.style.height = `${elem.contentWindow.document.body.scrollHeight}px`;
                    } }
                    id="frame-form-wrapper"
                    style={{
                      border: 'none',
                      width: '100%',
                      height: '100%',
                    }}
                    { ...frameContents[this.state.activeMapper] }
                  >
                    <div style={{ padding: 8, overflowX: 'hidden' }}>
                      <FormRenderer
                        { ...mapperVariants[this.state.activeMapper] }
                        schema={ parsedSchema }
                        onSubmit={ console.log }
                      />
                    </div>
                  </Frame>
                </div> }
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={ 12 } >
          <Typography variant="h5" gutterBottom>
              Notes
          </Typography>
        </Grid>
        <Grid item xs={ 12 } >
          <ContentText activeMapper={ activeMapper } component={ component } />
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
