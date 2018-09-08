import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';






const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class IntegrationReactSelect extends React.Component {
  state = {
    single: null,



  };


  enrollVolunteer = (volunteerId) => {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({
      type: 'ENROLL_VOLUNTEER',
      payload: {
        volunteerId: volunteerId,
        opportunityId: this.props.opportunity.id
      }
    })
  }
  handleChange = name => value => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    console.log(this.props.state.opportunitiesReducer.certifiedVolunteers);

    let volunteerList = this.props.state.opportunitiesReducer.certifiedVolunteers.map((volunteer, i) => {
      if (volunteer.certification_id == this.props.opportunity.certification_needed && volunteer.is_certified == true) {
        return ({ label: `${volunteer.first_name} ${volunteer.last_name}`, id: volunteer.id })
      }
    })
    console.log(volunteerList);


    let list = volunteerList.filter(volunteer => (volunteer !== undefined)).map(volunteerList => ({
      value: volunteerList.label,
      label: volunteerList.label,
      id: volunteerList.id

    }))
    console.log(list);

    const { classes, theme } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
      }),
    };

    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            styles={selectStyles}
            options={list}
            components={components}
            value={this.state.single}
            onChange={this.handleChange('single')}
            placeholder="Search Volunteers"
          />
          <div className={classes.divider} />
        </NoSsr>
        <Button onClick={() => this.enrollVolunteer(this.state.single.id)} variant="contained" color="primary" className={classes.button}>
          Add Volunteer
        <AddIcon className={classes.rightIcon} />
        </Button>
      </div>
    );
  }
}

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  state
});


export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(IntegrationReactSelect));