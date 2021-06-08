import React, {Component} from 'react';
import './itemDetails.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}
export {
    Field
}

export default class ItemDetails extends Component {


    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const{itemId, getData} = this.props;
        if (!itemId) return;

        getData(itemId)
            .then(item => {
                this.setState({item, loading: false});
            })
            .catch(() => this.onError())
    }

    onError() {
        this.setState({
            item: null,
            error: true
        })
    }

    noData = (param) => {
        if (param === '') {
            return 'no-data :('
        }
        return param
    } 


    render() {
        if (this.state.error && !this.state.item) {
            return <ErrorMessage/>
        } else if (!this.state.item) {
            return <span className='select-error'>Please select item in the list</span>
        }

        if (this.state.loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }
        const {item} = this.state; 
        const {name} = item;

        return (
            <div className="char-details rounded">
                <h4>{this.noData(name)}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        );
    }
}