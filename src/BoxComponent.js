import React, { Component } from 'react'
import swal from 'sweetalert';
import Box from './Coin.js'
import { generateBoxColor } from './helper'
import styles from './resources.css';

const TableTrTd = (option) => {
  return <tr key={`td_${Math.random()}`} >
    {
      option.colorItem.child.map(function (item, index) {
        return <td key={`td_${index}`} > {item.color === 'red' ? <Box color={item.color} row={item.row} column={item.col} />
          : <Box color={item.color} row={item.row} column={item.col} changeColor={option.changeColor} />}
        </td>
      }, this)
    }
  </tr>
}
class BoxComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      colors: generateBoxColor(this.props.num, this.props.autoColorBoxCount)
    }
    this.changeColor = this.changeColor.bind(this);
    this.checkWinnerAndLoser = this.checkWinnerAndLoser.bind(this)
  }
  changeColor(event) {
    if (event) {
      const { colors } = this.state;
      const { interval } = this.props;
      const delimter = `_`, me = this, rowColIndex = event.target.id.split(delimter);
      var intervalClear;
      let row = rowColIndex[rowColIndex.length - 2], colum = rowColIndex[rowColIndex.length - 1];
      colors[row - 1].child[colum - 1].color = "red";
      this.setState({ colors: colors }, function () { me.checkWinnerAndLoser(colors) });
      intervalClear = setInterval(function () {
        colors[row - 1].child[colum - 1].color = "black";
        me.setState({ colors: colors });
        clearInterval(intervalClear);
      }, interval);
    }
  }
  checkWinnerAndLoser(colors) {
    let blackbox = [];
    colors.map(item => {
      if (item.child.filter(childColor => childColor.color === 'black').length > 0) {
        blackbox = blackbox.concat(item.child.filter(childColor => childColor.color === 'black'))
      }
    });
    if (blackbox.length == 0) {//check if black item is 0
      swal({
        title: "Winner",
        icon: "success",
        text: "You are winner",
        dangerMode: true
      });
      return false;
    }
  }
  render() {
    const { num, autoColorBoxCount } = this.props;
    const { colors } = this.state;
    return (
      <div className={styles.boxCntainer}>
        <table key='play-board-matrix'>
          <thead></thead>
          <tbody>
            {colors.map(color => (
              // For each color make a box component 
              <TableTrTd key={`play-board-matrix${Math.random()}`} autoColorBoxCount={autoColorBoxCount} number={num} colorItem={color} changeColor={this.changeColor} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default BoxComponent