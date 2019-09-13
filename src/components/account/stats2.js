import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    VerticalBarSeriesCanvas,
    LabelSeries
} from 'react-vis';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";

const blueData = [{x: 'Dépense', y: 25}, {x: 'Chiffre d\'affaire', y: 45}];


const labelData = blueData.map((d, idx) => ({
}));

class Stats2 extends React.Component {
    state = {
        useCanvas: false
    };

    render() {
        const {useCanvas} = this.state;
        const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
        const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
        return (
            <div>
                <XYPlot xType="ordinal" width={300} height={300} xDistance={100}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <BarSeries className="vertical-bar-series-example" data={blueData} />
                    <LabelSeries data={labelData} getLabel={d => d.x} />
                </XYPlot>
            </div>
        );
    }
}

Stats2.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    msg: PropTypes.string,
    error: PropTypes.string,
    billing: PropTypes.object,
    modif: PropTypes.bool.isRequired,
    table: PropTypes.bool.isRequired,
    artworks: PropTypes.array,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {
        isFetching,
        msg,
        error,
        billing,
        modif,
        table,
        artworks,
        dispatch
    } = state.billings;

    return {
        isFetching,
        msg,
        error,
        billing,
        modif,
        table,
        artworks,
        dispatch
    }
}

export default connect(
    mapStateToProps
)(Stats2);