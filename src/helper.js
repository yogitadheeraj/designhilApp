// Method generates an array of rgb colors 
const generateBoxColor = (num, autoColorBoxCount) => {
    let colors = []
    let colorAssignedCunt = 0;
    for (let i = 0; i < num; i++) {
        let item = { index: i, child: [] };
        for (let j = 0; j < num; j++) {
            colorAssignedCunt++;
            item.child.push({ row: i + 1, col: j + 1, color: colorAssignedCunt > autoColorBoxCount ? 'red' : 'black' });
        }
        colors.push(item);
    }
    return colors
}

export { generateBoxColor }