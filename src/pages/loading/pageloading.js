import {Component} from 'react'
import loading from '../resources/loading.gif';

class PageLoading extends Component {
    render() {
        return(
            <div className="loading">
                <img src={loading} />
            </div>
        );
    }
}

export default PageLoading;