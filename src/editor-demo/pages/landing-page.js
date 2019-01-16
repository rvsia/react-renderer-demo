import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Build from '@material-ui/icons/Build';
import BulletListIcon from '@material-ui/icons/FormatListBulleted';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

const LandingPage = () => (
  <Grid
    container
    spacing={ 16 }
    direction="column"
    justify="center"
    alignItems="center"
  >
    <Typography variant="h5">React Form Renderer</Typography>
    <Grid item xs={ 12 }>
      <Card
        square
        style={{
          width: 400,
        }}
      >
        <CardHeader title="Form Renderer" avatar={ <Build color="primary" /> }/>
        <CardContent>
          <Typography paragraph>
            This is the backbone of the whole library.
            It takes your form schema and component mapper, puts them all together and renders form component.
          </Typography>
          <Typography paragraph>
            If you are not familiar with the <Button component={ props => <RouterLink to="/react-form-renderer" { ...props } /> }>JSON definition</Button> please check it out first!
          </Typography>
        </CardContent>
        <CardActions disableActionSpacing>
          <Grid container alignItems="center" justify="center">
            <RouterLink to="/secret/react-form-renderer" style={{ width: '100%' }}>
              <Button color="primary" style={{ width: '100%' }}>
                Form Renderer
              </Button>
            </RouterLink>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
    <Grid item xs={ 12 }>
      <Card
        square
        style={{
          width: 400,
        }}
      >
        <CardHeader title="Form Schema Definition" avatar={ <BulletListIcon color="primary" /> }/>
        <CardContent>
          <Typography paragraph>
            Use your data to specify which form fields should be rendered.
          </Typography>
        </CardContent>
        <CardActions disableActionSpacing>
          <Grid container alignItems="center" justify="center">
            <RouterLink to="/secret/react-form-renderer" style={{ width: '100%' }}>
              <Button color="primary" style={{ width: '100%' }}>
                Form Schema Definition
              </Button>
            </RouterLink>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
    <Typography variant="h5">Component mappers</Typography>
    <Grid item style={{
      maxWidth: 800,
    }}>
      <Typography >Component mappers specify how your Forms look and what components will be used for individual form fields.</Typography>
      <Typography >We have created some mappers that you can use, or you can create your own.</Typography>
      <Typography >Mappers are complety customizible and extensible. You can create new components or modify existing ones.</Typography>
    </Grid>
    <Grid item>

      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        spacing={ 16 }
      >
        <Grid item>
          <Card square>
            <CardActionArea>
              <RouterLink to="/secret/react-form-renderer">
                <CardContent>
                  <Typography component="h5" variant="h5">
                    Material ui mapper
                  </Typography>
                </CardContent>
                <CardMedia
                  style={{ height: 50 }}
                  image="https://material-ui.com/static/images/material-ui-logo.svg"
                  title="Material ui mapper"
                />
              </RouterLink>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item>
          <Card square>
            <CardContent>
              <Typography component="h5" variant="h5">
                Patternfly 4 mapper
              </Typography>
            </CardContent>
            <CardMedia
              style={{ height: 50 }}
              image="https://www.patternfly.org/assets/img/patternfly-orb.svg"
              title="Patternfly 4 mapper"
            />
          </Card>
        </Grid>
        <Grid item>
          <Card square>
            <CardContent>
              <Typography component="h5" variant="h5">
                Patternfly 3 mapper
              </Typography>
            </CardContent>
            <CardMedia
              style={{ height: 50 }}
              image="https://www.patternfly.org/assets/img/patternfly-orb.svg"
              title="Patternfly 3 mapper"
            />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default LandingPage;

