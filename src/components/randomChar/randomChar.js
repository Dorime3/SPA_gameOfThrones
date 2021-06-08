import React, {Component} from 'react';
import './randomChar.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage/';
import PropTypes from 'prop-types';

export default class RandomChar extends Component {

    gotService = new gotService();
    state = {
        char: {},
        loading: true,
        error: false
    }

    static defaultProps = {
        interval: 15000
    }


    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, this.props.interval); 
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        });
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random()*140 + 25);
        // const id = 99999;
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <Viev char={char} /> : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

RandomChar.propTypes = {
    interval: PropTypes.number
}

const Viev = ({char}) => {
    const {name, gender, born, died, culture} = char;
    
    const noData = (param) => {
        if (param === '') {
            return 'no-data :('
        }
        return param
    } 

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{noData(gender)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{noData(born)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{noData(died)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{noData(culture)}</span>
                </li>
            </ul>
        </>
    )
}