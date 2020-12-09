import React, { Component } from 'react'

class Box extends Component {
    constructor(props) {
        super(props)
        this.handleChangeColor = this.handleChangeColor.bind(this)
    }
    // Handler callback 
    handleChangeColor(e) {
        if (this.props.changeColor) {
            this.props.changeColor(e);
        }
    }
    render() {
        const { row, column, color } = this.props;
        // Create a div component and assign the given 
        // color value by BoxContainer component as its 
        // background color 
        return <div key={`box_${Math.random()}`} id={`${row}_${column}`} onClick={this.handleChangeColor}
            style={{
                backgroundColor: color,
                cursor: "pointer",
                width: '5em', height: '5em'
            }}
        />
    }
}

export default Box
