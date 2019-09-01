import React, { Component } from "react";
import logo from "./logo.svg";
import PropTypes from "prop-types";
import "./App.css";
import Button from "@material-ui/core/Button";
import MuiThemeProvider from "@material-ui/styles/ThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));


const theme = createMuiTheme({
  palette: {
    type: "light"
  }
});

const SimpleTable = (props) => {
  const classes = useStyles();
  console.log(props.response)
  return (
    <div>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell >Craft</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.response.map(elem => (
          <TableRow key={elem.id}>
            <TableCell component="th" scope="row">
              {elem.id}
            </TableCell>
            <TableCell>
              {elem.craftName}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}

SimpleTable.propTypes = {
  response: PropTypes.array.isRequired
}

class App extends Component {
  state = {
    response: [],
    post: "",
    responseToPost: ""
  };

  componentDidMount() {
    this.callApi()
      .then(({result: response}) => this.setState({ response }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/api/world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: this.state.post })
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };
  render() {
    console.log(this.state.response)
    // const classes = useStyles();
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <Button variant="contained" color="primary">
              Hello World
            </Button>
          </header>
          <SimpleTable
            response={this.state.response}
            />
          <form onSubmit={this.handleSubmit}>
            <p>
              <strong>Post to Server:</strong>
            </p>
            <input
              type="text"
              value={this.state.post}
              onChange={e => this.setState({ post: e.target.value })}
            />
            <button type="submit">Submit</button>
          </form>
          <p>{this.state.responseToPost}</p>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
