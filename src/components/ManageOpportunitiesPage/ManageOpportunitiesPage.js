import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import TextField from '@material-ui/core/TextField'
import AdminNav from '../Nav/AdminNav/AdminNav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import OpportunitiesCardAdminView from '../OpportunitiesCardAdminView/OpportunitiesCardAdminView.js';
import { Button } from '@material-ui/core';
import CreateOpportunityDialogue from '../CreateOpportunityDialogue/CreateOpportunityDialogue';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const mapStateToProps = state => ({
    opportunitiesList: state.opportunitiesReducer.opportunitiesReducer,
    user: state.user,    
});

function searchingFor(term) {
    return function (opportunity) {
        if (opportunity.title) {
            return opportunity.title.toLowerCase().includes(term.toLowerCase()) || !term;
        }
    }
}
function searchStatus(status) {
    return function (opportunity) {
        if (opportunity.status) {
            return opportunity.status == status || !status;
        }
    }
}
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    topBox: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr'
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

});
class InfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            createEventIsOpen: false,
            status: ''
        }

        this.searchHandler = this.searchHandler.bind(this);
    }


    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: 'GET_EVENTS' })
        this.props.dispatch({ type: 'GET_CERTIFICATIONS_LIST' });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && (this.props.user.email === null || this.props.user.access_level < 2)) {
            this.props.history.push('/home');

        }
    }

    searchHandler(event) {
        this.setState({
            term: event.target.value
        })
    }

    openCreateEvent = () => {
        this.setState({
            createEventIsOpen: true,
        })
    }
    closeCreateEvent = () => {
        this.setState({
            createEventIsOpen: false,
        })
    }
    handleChange = event => {
        this.setState({ status: event.target.value });
    };

    render() {

        const { classes } = this.props;
        let content = null;
        let opportunitiesArray = this.props.opportunitiesList.filter(searchStatus(this.state.status)).filter(searchingFor(this.state.term)).map((opportunity, index) => {
            return (<OpportunitiesCardAdminView key={index}
                opportunity={opportunity} admin={true}
            />)
        })


        if (this.props.user.email) {
            content = (
                <div>
                    <div>
                        {opportunitiesArray}
                    </div>
                </div>
            );
        }

        return (
            <div>
                <Header admin={true} />
                <AdminNav />
            <div className={classes.topBox}>
                <Button
                    className={classes.button}
                    variant="raised"
                    color="primary"
                    onClick={this.openCreateEvent}
                    style={{ margin: 20, maxHeight: 25 }}
                >
                    Create Opportunity
                    </Button>
                <CreateOpportunityDialogue
                    createEventIsOpen={this.state.createEventIsOpen}
                    closeCreateEvent={this.closeCreateEvent}
                />
                <div style={{ textAlign: 'center', height: 100, margin: 25 }}>

                    <TextField
                        id="full-width"
                        label=""
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Search..."
                        helperText="What opportunity are you looking for?"
                        width='50'
                        margin="normal"
                        onChange={this.searchHandler}
                        value={this.state.term}

                    />
                </div>
                <div style={{ textAlign: 'center', height: 100, margin: 25 }}>
                    <FormControl  className={classes.formControl}>
                        <InputLabel>Filter Status</InputLabel>
                        <Select
                            value={this.state.status}
                            onChange={this.handleChange}
                        >
                            <MenuItem value=""><em>All</em></MenuItem>
                            <MenuItem value="1">Staging</MenuItem>
                            <MenuItem value="2">Active</MenuItem>
                            <MenuItem value="3">Inactive</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                </div>
                {content}
            </div>
        );
    }
}


export default connect(mapStateToProps)(withStyles(styles)(InfoPage));
