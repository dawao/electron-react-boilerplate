import React, { PropTypes, Component } from 'react';
import { connect }                     from 'react-redux';
 // import { Connector } from 'react-redux';
//import * as ChartActions      from '../actions/actionIndex';
import FuelSpeedVis                    from '../components/fuelSpeedVis';
import { bindActionCreators } from 'redux';
import { fetchAutomaticApiData }       from '../actions/actionIndex';
import { Link } from 'react-router';
import styles from '../components/Counter.module.css';

class Chart extends Component {

  static propTypes = {
    fetchAutomaticApiData: React.PropTypes.func,
    apiData: React.PropTypes.array
  }

  componentDidMount() {
    console.log('props: ', this.props);
    this.props.fetchAutomaticApiData("data/MSFT.tsv");
  }

  componentDidUpdate() {
    console.log('upprops: ', this.props);
  }

  render() {
    //console.log(this.props);
    return (
      <div>
        <div className={styles.backButton} >
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <br/><br/><br/>
        <FuelSpeedVis data={this.props.data} type="svg"/>
      </div>
      // <Connector select={state => ({ counter: state.counter })}>
      //   {this.renderChild}
      // </Connector>
    )
  }

  renderChild({ someapp, dispatch }) {
    const actions = bindActionCreators(fetchAutomaticApiData, dispatch);
    return (
      <div>
        <FuelSpeedVis data={actions.apiData} type="svg"/>
      </div>
    );
  }

}

// Chart.propTypes = {
//   fetchAutomaticApiData: React.PropTypes.func,
//   apiData: React.PropTypes.array
// }

// Turn App into a connected component. Since this is a small app, it will be
// responsible for ajax and passing the results to its children

function mapStateToProps(state) {
    return {
    data: state.reducer.apiData
  };
}
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(ChartActions, dispatch);
// }
//export default connect(mapStateToProps, mapDispatchToProps)(Chart);
export default connect(mapStateToProps, {fetchAutomaticApiData})(Chart);