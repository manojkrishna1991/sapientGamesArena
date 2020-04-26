import React from "react";
import {
  List,
  Card,
  Icon,
  Image,
  Grid,
  Dimmer,
  Loader
} from "semantic-ui-react";
import axios from "axios";
class GameList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="box-content">
        <Grid relaxed="very" columns={4}>
          {this.props.results.map((game, index) => {
            return (
              <>
                <Grid.Column>
                  <Card key={index} style={{ margin: 30 }}>
                    <Image src="/white-image.png" wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>{game.title}</Card.Header>
                      <Card.Meta>
                        <span className="date">
                          Release Year: {game.release_year}
                        </span>
                      </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                      <Icon name="send" />
                      <a>
                        {" "}
                        <span className="blue-text">Game Genre :</span>{" "}
                        {game.genre}
                      </a>
                    </Card.Content>
                    <Card.Content extra>
                      <Icon name="microsoft" />
                      <a>
                        {" "}
                        <span className="blue-text">Game Platform :</span>
                        {game.platform}
                      </a>
                    </Card.Content>
                    <Card.Content extra>
                      <a>
                        <Icon name="user" />
                        <span className="blue-text">Editor Choice </span>:
                        {game.editors_choice}
                      </a>
                    </Card.Content>
                    <Card.Content extra>
                      <a>
                        <Icon name="star" />
                        <span className="blue-text">Score:</span>
                        {game.score}
                      </a>
                    </Card.Content>

                    {game.editors_choice && (
                      <Card.Content extra>
                        <a>
                          <Icon name="thumbs up" />
                          <span className="blue-text">Editors Choice</span>
                        </a>
                      </Card.Content>
                    )}
                  </Card>
                </Grid.Column>
              </>
            );
          })}
        </Grid>
      </div>
    );
  }
}
const isEven = index => {
  if (index % 4 == 0) {
    return true;
  }
  return false;
};
export default GameList;
