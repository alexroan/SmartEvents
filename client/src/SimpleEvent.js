import React from "react";

class SimpleEvent extends React.Component {
  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.SimpleEvent;

    // let drizzle know we want to watch the `getName` method
    const nameKey = contract.methods["getName"].cacheCall();
    const priceKey = contract.methods["getPrice"].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ nameKey,priceKey });
  }

  render() {
    // get the contract state from drizzleState
    const { SimpleEvent } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    var getName = "loading name"
    var getPrice = "Loading price"
    console.log(this.props.drizzleState.accountBalances);
    if(this.state != null){
        getName = SimpleEvent.getName[this.state.nameKey];
        getPrice = SimpleEvent.getPrice[this.state.priceKey];
    }

    // if it exists, then we display its value
    return <p>Event name: {getName && getName.value} Price: {getPrice && getPrice.value}</p>;
  }
}

export default SimpleEvent;