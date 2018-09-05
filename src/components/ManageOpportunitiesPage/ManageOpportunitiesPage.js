import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../Header/Header';
import TextField from '@material-ui/core/TextField'
import Nav from '../Nav/VolunteerNav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import OpportunitiesCard_AdminView from '../OpportunitiesCard_AdminView/OpportunitiesCard_AdminView.js';
import { Button } from '@material-ui/core';
import CreateOpportunityDialogue from '../CreateOpportunityDialogue/CreateOpportunityDialogue';

const mapStateToProps = state => ({
    opportunitiesList: state.opportunitiesReducer.opportunitiesReducer,
    user: state.user
});

function searchingFor(term) {
    return function (sponsor) {
        if (sponsor.title) {
            return sponsor.title.toLowerCase().includes(term.toLowerCase()) || !term;
        }
    }
}

class InfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            createEventIsOpen: false,
        }
        this.searchHandler = this.searchHandler.bind(this);
    }
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: 'GET_EVENTS' })

    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.email === null) {
            this.props.history.push('home');
            console.log(this.props.state);

        }
    }
    searchHandler(event) {
        this.setState({
            term: event.target.value
        })
    }

    render() {
        let content = null;
        let opportunitiesArray = this.props.opportunitiesList.filter(searchingFor(this.state.term)).map((opportunity, index) => {
            return (<OpportunitiesCard_AdminView key={index}
                opportunity={opportunity}
            />)
        })


        if (this.props.user.email) {
            content = (
                <div>
                    <p>
                        Manage Opportunities Page
                        {opportunitiesArray}
                    </p>
                </div>
            );
        }

        return (
            <div>
                <Header />
                <Nav />
                <form style={{ height: 60, background: 'rgba(255,255,255,0.5)', borderRadius: 15 }}>
                    <Button
                        variant="raised"
                        color="primary"
                    >
                        Create Opportunity
                </Button>
                    <CreateOpportunityDialogue
                        createEventIsOpen={this.state.createEventIsOpen}

                    />
                    <TextField
                        id="full-width"
                        label=""
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Search..."
                        helperText="What city are you looking for?"
                        width='50'
                        margin="normal"
                        onChange={this.searchHandler}
                        value={this.state.term}
                    />
                </form>
                {content}
                {/* <OpportunitiesCard_AdminView /> */}


            </div>
        );
    }
}


export default connect(mapStateToProps)(InfoPage);
