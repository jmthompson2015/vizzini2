import ReactUtils from "./ReactUtilities.js";

class GridBoardUI extends React.PureComponent {
  render() {
    const {
      backgroundColor,
      cellClassFunction,
      cellFunction,
      calculator,
      tableClass,
      tokens
    } = this.props;

    const rows = [];

    for (let r = calculator.rankCount; r > 0; r -= 1) {
      const cells = [];

      for (let f = 1; f <= calculator.fileCount; f += 1) {
        const an = calculator.fileRankToAN(f, r);
        let token = tokens[an];
        if (token === null) token = "\u00A0";

        const className = cellClassFunction(calculator, an, token);
        const cell = cellFunction(calculator, an, token);
        cells.push(ReactUtils.createCell(cell, `cell${f}${r}`, className));
      }

      rows.push(ReactUtils.createRow(cells, `row${r}`));
    }

    return ReactUtils.createTable(rows, "gridBoardUI", tableClass, { style: { backgroundColor } });
  }
}

GridBoardUI.propTypes = {
  calculator: PropTypes.shape().isRequired,
  tokens: PropTypes.arrayOf(PropTypes.string).isRequired,

  backgroundColor: PropTypes.string,
  cellClassFunction: PropTypes.func,
  cellFunction: PropTypes.func,
  tableClass: PropTypes.string
};

GridBoardUI.defaultProps = {
  backgroundColor: "Gainsboro",
  cellClassFunction: (calculator, an, token) => "ba bw1 pa2",
  cellFunction: (calculator, an, token) => token || an,
  tableClass: "ba bw1 center tc"
};

export default GridBoardUI;
