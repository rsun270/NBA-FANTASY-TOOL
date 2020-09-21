import React, { Component } from "react";

export default class Results extends Component {
  render() {
    return (
      <table id="roster1">
        <tr>
          <th>PER GAME STATS</th>
        </tr>
        <tr>
          <th>Player</th>
          <th>MPG</th>
          <th>FG%</th>
          <th>FT%</th>
          <th>3PM</th>
          <th>PTS</th>
          <th>REB</th>
          <th>AST</th>
          <th>STL</th>
          <th>BLK</th>
          <th>TO</th>
        </tr>
      </table>
    );
  }
}
