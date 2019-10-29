import React from "react";
import Header from "./header";
import Order from "./order";
import Inventory from "./inventory";
import Fish from "./fish";
import sampleFishes from "../sample-fishes";
import base from "../base";
import PropTypes from "prop-types";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount() {
    const { params } = this.props.match;

    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    //With this sync instruction we are listening from changes in our database.
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    //console.log(this.state.order);
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({
      fishes
    });
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. Update that state
    fishes[key] = updatedFish;
    // 3. Set that to state
    this.setState({ fishes });
  };

  deleteFish = key => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. update the state (firebase needs to set the entry to null to perform its deletion)
    fishes[key] = null;
    // 3. Update the state
    this.setState({ fishes });
  };

  addToOrder = key => {
    // 1. Take a copy of the state
    const order = { ...this.state.order };
    // 2. Either update to the order, or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Update our state object
    this.setState({ order });
  };

  removeFromOrder = key => {
    // 1. Take a copy of the state
    const order = { ...this.state.order };
    // 2. Remove the order entry
    delete order[key];
    // 3. Update the state
    this.setState({ order });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
