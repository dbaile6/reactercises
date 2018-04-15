
//experimentaton with adding css using react

//define cell properties
const cellStyle = {
  width: '10px',
  height: '10px',
  border: '1px solid rgba(104, 112, 103, 0.5)'
};

// alive state color
const aliveStyle = {
  backgroundColor: 'pink'
};

//cell color of 'dead' state
const deadStyle = {
  backgroundColor: 'black'
};

//cell color of 'alive' state for more than one generation
const oldStyle = {
  backgroundColor: 'red'
};

//top navigation bar properties
const navStyle = {
  width:'100%',
  position:'fixed',
  marginTop:'-100px',
  height: '30px',
  backgroundColor:'black',
  color:'rgb(104, 112, 103)',
  zIndex:1
};

//navigation bar generation counter properties
const genStyle = {
  position: 'absolute',
  marginLeft: '20px'
};

//navigation bar play/pause button properties
const ppStyle = {
  position: 'absolute',
  marginLeft: '200px',
  cursor:'pointer'
};

//navigation bar clear button properties
const clearStyle = {
  position: 'absolute',
  marginLeft: '300px',
  cursor:'pointer'
};

//table position and margin
const tableStyle = {
  position: 'relative',
  margin: '0 auto',
  marginTop: '100px'
};


const rowInputStyle = {
  position: 'relative',
  marginLeft: '500px'
};

const colInputStyle = {
  position: 'relative',
  marginLeft: '700px',
  marginTop:'-28px'
}

const inputStyle = {
  backgroundColor:'transparent',
  width: '50px',
  border: '1px solid black'

//three possible states for each cell
const lifecycle = [aliveStyle, deadStyle, oldStyle];

//component for game board
class Board extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      board: this.generateRandomBoard(),
      ticker: null,
      generation: 0,
      play: false,
      rows: 150,
      cols: 120,
      speed: 50
    };
  }
  
  //generates random board with each cell in one of three possible states; called automatically upon mounting
  generateRandomBoard = () => {
    let board = [];
    let rows = 150;
    let cols = 120;
    for (let i = 0; i < rows; i++) {
      board.push([]);
      for (let j = 0; j < cols; j++) {
        board[i][j] = Math.round(Math.random());
      }
    }
    return board;
  };

  componentDidMount() {
    let that = this;
    this.setState({
      ticker: setInterval(function() {
        that.tick()
      }, this.state.speed),
      play: true
    });
  }

  //advances board one generation; contains logic for state of cells in next generation
  tick = () => {
    let arr = [];
    for (let i = 0; i < this.state.rows; i++) {
      let row = this.state.board[i].slice();
      for (let j = 0; j < this.state.cols; j++) {
        row[j] = this.checkSurroundingCells(i, j);
      }
      arr.push(row);
    }
    this.setState({
      board: arr,
      generation: ++this.state.generation
    });
  };

  //checks cells contiguous to a particular cell with x and y coordinates given by parameters i,j, respectively
  checkSurroundingCells = (i, j) => {
    let x = i + 1 >= this.state.rows ? 0: i + 1;
    let y = i - 1 <= -1 ? this.state.rows - 1: i - 1;
    let z = j + 1 >= this.state.cols ? 0: j + 1;
    let w = j - 1 <= -1 ? this.state.cols - 1: j - 1;
    let arr = [[y, w], [y, j], [y, z],
               [i, w],         [i, z],
               [x, w], [x, j], [x, z]];
    let liveNeighbors = 0;
    for (let k = 0; k < arr.length; k++) {
      if (this.state.board[arr[k][0]][arr[k][1]] !== 1) {
        liveNeighbors++;
      }
    }
    switch (liveNeighbors) {
      case 2:
        if (this.state.board[i][j] === 1) return 1;
      case 3:
        if (this.state.board[i][j] === 1) return 0;
        return 2;
      default:
        return 1;
    }
  };

  //toggles cell state to dead if alive or old and alive if dead when user clicks cell
  handleClick = (row, col) => {
    let clickedRow = this.state.board[row].slice();
    clickedRow[col] = this.state.board[row][col] !== 1 ? 1:0;
    let arr = [];
    for (let i = 0; i < this.state.rows; i++) {
      let nextRow = i === row ? clickedRow: this.state.board[i].slice();
      arr.push(nextRow);
    }
    this.setState({
      board:arr
    });
  };

  //toggles board state between 'play' - board ticking up generations - and 'pause' - board displaying single generation
  togglePlayPause = () => {
    let that = this;
    this.setState({
      play:!this.state.play,
      ticker:this.state.play ? clearInterval(this.state.ticker):setInterval(function() {
        that.tick();
      }, this.state.speed)
    });
  };

  //sets all cells on board to 'dead'
  clear = () => {
    let arr = [];
    for (let i = 0; i < this.state.rows; i++) {
      arr.push([]);
      for (let j = 0; j < this.state.cols; j++) {
        arr[i][j] = 1;
      }
    }
    this.setState({
      play:false,
      ticker: clearTimeout(this.state.ticker),
      board: arr,
      generation: 0
    });
  };
  
  render() {
    let that = this;
    let board = this.state.board.map(function(a, row) {
      return <tr>
              {
                a.map(function(b, col) {
                  let style = {
                    ...cellStyle,
                    ...lifecycle[b]
                  };
                  let animate = function() {
                    return that.handleClick(row, col);
                  };
                  return <td onClick={animate} style={style}></td>
                })
              }
             </tr>
    });
    return <div>
             <div style={navStyle}>
               <div style={genStyle}>
                 Generation: {this.state.generation}
               </div>
               <div style={ppStyle} onClick={this.togglePlayPause}>
                 {this.state.play ? '❚❚':'▶'}
               </div>
               <div style={clearStyle} onClick={this.clear}>
                 Clear
               </div>
             </div>
             <table style={tableStyle}>
               {board}
             </table>
           </div>
  }
}

ReactDOM.render(<Board />, document.getElementById('node'));