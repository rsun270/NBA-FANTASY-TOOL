import React, { Component } from "react";
const KEY = process.env.REACT_APP_NBA_API_KEY;

class SelectYourTeam extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {};
  }

  displayPlayer = (e) => {
    let id = e.target.selectedIndex;
    let playerName = e.target[id].text;
    let playerId = e.target.value;

    this.setState({ teamCode: e.target.value });

    var statsURL =
      "https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStatsByPlayer/2020/";
    statsURL += playerId;

    let table = document.getElementById("roster1");
    // player entry
    let row = table.insertRow(-1);

    let name = row.insertCell(0);
    let min = row.insertCell(1);
    let fg = row.insertCell(2);
    let ft = row.insertCell(3);
    let threes = row.insertCell(4);
    let pts = row.insertCell(5);
    let rebs = row.insertCell(6);
    let ast = row.insertCell(7);
    let stl = row.insertCell(8);
    let blk = row.insertCell(9);
    let to = row.insertCell(10);
    let button = row.insertCell(11);

    name.innerHTML = playerName;

    let btn = document.createElement("input");
    btn.type = "button";
    btn.className = "btn";
    btn.value = "X";
    btn.addEventListener("click", function () {
      table.deleteRow(this.parentNode.parentNode.rowIndex); // button -> td -> tr.
    });
    button.appendChild(btn);

    // display statistics
    fetch(statsURL, {
      method: "GET",
      headers: {
        "Ocp-Apim-Subscription-Key": "57dd407d1ef744858ce498a1e9f8d8fe",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // pass this data down to results component

        // display stats in table
        let totalGames = data.Games;

        // MPG
        min.innerHTML = Math.round(data.Minutes / totalGames);
        // FG%
        fg.innerHTML =
          Math.round((data.FieldGoalsMade / data.FieldGoalsAttempted) * 100) +
          "%";
        // FT%
        ft.innerHTML =
          Math.round((data.FreeThrowsMade / data.FreeThrowsAttempted) * 100) +
          "%";
        // 3PM
        threes.innerHTML = Math.round(data.ThreePointersMade / totalGames);
        // PTS
        pts.innerHTML = Math.round(data.Points / totalGames);
        // REB
        rebs.innerHTML = Math.round(data.Rebounds / totalGames);
        // AST
        ast.innerHTML = Math.round(data.Assists / totalGames);
        // STL
        stl.innerHTML = Math.round(data.Steals / totalGames);
        // BLK
        blk.innerHTML = Math.round(data.BlockedShots / totalGames);
        // TO
        to.innerHTML = Math.round(data.Turnovers / totalGames);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (e) => {
    // send this to Results.js

    var url = "https://api.sportsdata.io/v3/nba/stats/json/Players/";
    url += e.target.value;
    var team = document.getElementById("team1");
    team.options.length = 0;

    fetch(url, {
      method: "GET",
      headers: {
        "Ocp-Apim-Subscription-Key": "57dd407d1ef744858ce498a1e9f8d8fe",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // map all names into select
        team.options.add(new Option("Select Player", ""));
        for (let i = 0; i < data.length; i++) {
          team.options.add(new Option(data[i].FanDuelName, data[i].PlayerID));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <select onChange={this.handleChange}>
          <option defaultValue="">Select Team</option>
          <option value="ATL">Atlanta Hawks</option>
          <option value="BOS">Boston Celtics</option>
          <option value="BKN">Brooklyn Nets</option>
          <option value="CHA">Charlotte Hornets</option>
          <option value="CHI">Chicago Bulls</option>
          <option value="CLE">Cleveland Cavaliers</option>
          <option value="DAL">Dallas Mavericks</option>
          <option value="DEN">Denver Nuggets</option>
          <option value="DET">Detroit Pistons</option>
          <option value="GS">Golden State Warriors</option>
          <option value="HOU">Houston Rockets</option>
          <option value="IND">Indiana Pacers</option>
          <option value="LAC">Los Angeles Clippers</option>
          <option value="LAL">Los Angeles Lakers</option>
          <option value="MEM">Memphis Grizzlies</option>
          <option value="MIA">Miami Heat</option>
          <option value="MIL">Milwaukee Bucks</option>
          <option value="MIN">Minnesota Timberwolves</option>
          <option value="NO">New Orleans Pelicans</option>
          <option value="NY">New York Knicks</option>
          <option value="OKC">Oklahoma City Thunder</option>
          <option value="ORL">Orlando Magic</option>
          <option value="PHI">Philadelphia 76ers</option>
          <option value="PHO">Phoenix Suns</option>
          <option value="POR">Portland Trail Blazers</option>
          <option value="SAC">Sacramento Kings</option>
          <option value="SA">San Antonio Spurs</option>
          <option value="TOR">Toronto Raptors</option>
          <option value="UTA">Utah Jazz</option>
          <option value="WAS">Washington Wizards</option>
        </select>
        <br></br>
        <select id="team1" onChange={this.displayPlayer}>
          <option>Select Player</option>
        </select>
        <br></br>
        <table id="roster1">
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
      </div>
    );
  }
}

export default SelectYourTeam;
