import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import axios from "axios";
import _ from "lodash";
import { trackPromise } from "react-promise-tracker";

import { Menu, Responsive, Segment, Search } from "semantic-ui-react";

import GameList from "./gameList";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: "",
      genericResults: [],
      showContent: false
    };
  }
  componentDidMount() {
    trackPromise(
      axios
        .get("http://starlord.hackerearth.com/gamesext", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept",
            server: "cloudflare-nginx"
          },
          responseType: "json"
        })
        .then(response => {
          const re = new RegExp(_.escapeRegExp(this.state.value), "i");
          this.setState({
            isLoading: false,
            genericResults: response.data,
            showContent: true,
            results: _.filter(response.data, re.test(response.data.title))
          });
          console.log(this.state.results);
        })
    );
  }
  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });
  };

  render() {
    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Segment
          style={{ minHeight: 700, padding: "1em 0em", marginTop: 30 }}
          className="main-content"
        >
          <Menu fixed={"top"} size="large" style={{ borderColor: "#fe414d" }}>
            <Menu.Item
              className="logo"
              style={{ padding: "1.5em ", color: "#fe414d" }}
              position="left"
              as="a"
              active
            >
              <i style={{ fontSize: 24 }} class="gamepad logo-icon icon"></i>
              Sapient Game Arena
            </Menu.Item>
            <Menu.Item
              style={{ padding: "1.5em " }}
              position="center"
              as="a"
              active
            >
              <Search
                loading={this.state.isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true
                })}
                results={this.state.results}
                value={this.state.value}
                {...this.props}
              />
            </Menu.Item>
          </Menu>

          <div>
            <GameList results={this.state.genericResults} showContent />
          </div>
        </Segment>
      </Responsive>
    );
  }
}
export default App;
