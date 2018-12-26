import React from "react";

class SimpleEvent extends React.Component {
  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.SimpleEvent;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["getName"].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { SimpleEvent } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const getName = SimpleEvent.getName[this.state.dataKey];

    // if it exists, then we display its value
    return <p>My name: {getName && getName.value}</p>;
  }
}

export default SimpleEvent;