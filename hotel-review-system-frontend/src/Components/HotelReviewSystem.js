import React, { Component } from 'react'
import LoginComponent from './LoginComponent.js'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.js'
import Header from './Header.js'
import HotelList from './HotelList.js'
import Hotel from './Hotel.js'
import  SignUp from './SignUp.js'
import GridComponent from './GridComponent.js'
import HotelsOnSearch from './HotelsOnSearch.js'


class HotelReviewSystem extends Component {
    render() {


        return (
            <div>
                <Router>
                    <Header/>
                        <Switch>
                        <Route path="/" exact component={SignUp}/> 
                            <Route path="/signin" exact component={GridComponent}/>  
                            <Route exact path="/hotels" component={HotelList} />
                            <Route path="/hotel/:id" component={Hotel} />
                            <Route path="/:flag/:name" component={HotelsOnSearch}/>
                        </Switch>

                        
                </Router>

            </div>
        )
    }
}

export default HotelReviewSystem;