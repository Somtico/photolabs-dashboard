import React, { Component } from "react";
import Loading from "./Loading";
import classnames from "classnames";
import Panel from "./Panel";

const data = [
  {
    id: 1,
    label: "Total Photos",
    value: 10,
  },
  {
    id: 2,
    label: "Total Topics",
    value: 4,
  },
  {
    id: 3,
    label: "User with the most uploads",
    value: "Allison Saeng",
  },
  {
    id: 4,
    label: "User with the least uploads",
    value: "Lukas Souza",
  },
];

class Dashboard extends Component {
  state = { loading: false, focused: null };

  selectPanel(id) {
    this.setState((prev) => ({
      focused: prev.focused === id ? null : id,
    }));
  }

  componentDidMount() {
    const focused = JSON.parse(localStorage.getItem("focused"));

    if (focused) {
      this.setState({ focused });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.focused !== this.state.focused) {
      localStorage.setItem("focused", JSON.stringify(this.state.focused));
    }
  }

  render() {
    // Apply the conditional CSS class
    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused !== null,
    });

    if (this.state.loading) {
      return <Loading />;
    }

    const filteredPanels = this.state.focused
      ? data.filter((panel) => this.state.focused === panel.id)
      : data;

    const panels = filteredPanels.map((panel) => (
      <Panel
        key={panel.id}
        id={panel.id}
        label={panel.label}
        value={panel.value}
        onSelect={(event) => this.selectPanel(panel.id)}
      />
    ));

    return <main className={dashboardClasses}>{panels}</main>;
  }
}

export default Dashboard;
