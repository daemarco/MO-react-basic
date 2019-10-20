import React from 'react';
import { getFunName } from "../helpers";

class StorePicker extends React.Component {

    myInput = React.createRef();

    goToStore = event => {
        // 1. Stop the Form from submitting
        event.preventDefault();
        // 2. Get the text from the input
        const storeName = this.myInput.current.value;
        // 3. Navigate to /store/whatever-user-entered
        this.props.history.push(`/store/${storeName}`);
    };
 
    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter A Store</h2>
                <input type="text" 
                       required
                       ref={this.myInput} 
                       placeholder="Store Name" 
                       defaultValue={getFunName()}></input>
                <button type="submit">Visit Store →</button>
            </form>
        )
    }
}

export default StorePicker;