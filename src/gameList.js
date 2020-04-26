import React from "react";
import { Image, List } from "semantic-ui-react";
import axios from "axios";
class GameList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listOfGames: [] };
  }
  componentDidMount() {
    axios
      .get("http://starlord.hackerearth.com/gamesext")
      .then(function(response) {
        // handle success
        this.setState({ listOfGames: response.data });
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log("fsdfdsf");
        console.log(error);
      });
  }
  render() {
    return (
      <List horizontal>
        {this.state.listOfGames.map(game => (
          <List.Item>
            <Image
              avatar
              src="https://react.semantic-ui.com/images/avatar/small/tom.jpg"
            />
            <List.Content>
              <List.Header>Tom</List.Header>
              Top Contributor
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  }
}
export default GameList;
