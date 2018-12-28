import React from "react";

class SimpleEvent extends React.Component {
  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.SimpleEvent;

    console.log(this.props.drizzleState.accounts[4]);
    // let drizzle know we want to watch the `getName` method
    const nameKey = contract.methods["getName"].cacheCall();
    const priceKey = contract.methods["getPrice"].cacheCall();
    var notOwner = this.props.drizzleState.accounts[4];
    const balanceKey = contract.methods["getBalance"].cacheCall({from: notOwner});

    // save the `dataKey` to local component state for later reference
    this.setState({ nameKey,priceKey,balanceKey });
  }

  render() {
    // get the contract state from drizzleState
    const { SimpleEvent } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    var getName = "loading name";
    var getPrice = "Loading price";
    var balance = "Loading balance";
    console.log(this.props);
    if(this.state != null){
        getName = SimpleEvent.getName[this.state.nameKey];
        getPrice = SimpleEvent.getPrice[this.state.priceKey];
        balance = SimpleEvent.getBalance[this.state.balanceKey];
    }

    // if it exists, then we display its value
    return <p>Event name: {getName && getName.value} Price: {getPrice && getPrice.value} Balance: {balance && balance.value}</p>;
  }
}

export default SimpleEvent;