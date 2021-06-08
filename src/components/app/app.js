import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';


import './app.css'

export default class App extends Component {
    gotService = new gotService();

    state = {
        showRandom: true
    };


    onToggleRandom = () => {
        this.setState(state => {
            return {showRandom: !state.showRandom}
        })
    }

    render() {
        const showRandomChar = this.state.showRandom ? <RandomChar interval={3000}/> : null;

        return (
            <Router>
                <div className='app'> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {showRandomChar}
                                <button
                                    type='button'
                                    className='btn btn-primary toggle-button'
                                    onClick={this.onToggleRandom}>Toggle random character
                                </button>
                            </Col>
                        </Row>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/books' exact component={BooksPage}/>
                        <Route path='/houses' component={HousesPage}/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;
                                return <BooksItem bookId={id}/>
                            }
                        }/>

                    </Container>
                </div>
            </Router>
        );    
    }
};
