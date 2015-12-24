import d3 from "d3";

export const REQUEST_API_DATA = 'REQUEST_API_DATA';
export const RECEIVE_API_DATA_SUCCESS = 'RECEIVE_API_DATA_SUCCESS';
export const RECEIVE_API_DATA_ERROR = 'RECEIVE_API_DATA_ERROR';
export const INITIAL_STATE = {apiData: [], isFetching: false};

function requestApiData(apiPath) {
  return {
    type: REQUEST_API_DATA,
    apiPath
  };
}

function receiveApiDataSucess(json) {
  return {
    type: RECEIVE_API_DATA_SUCCESS,
    apiData: json
  };
}

function receiveApiDataError() {
  return {
    type: RECEIVE_API_DATA_ERROR
  }
}
var parseDate = d3.time.format("%Y-%m-%d").parse;

export function fetchAutomaticApiData(apiPath) {
  return dispatch => {
    dispatch(requestApiData(apiPath));
    d3.tsv(apiPath, (err, data) => {
      if(err) dispatch(receiveApiDataError());
      /* change MSFT.tsv to MSFT_full.tsv above to see how this works with lots of data points */
      data.forEach((d, i) => {
        d.date = new Date(parseDate(d.date).getTime());
        d.open = +d.open;
        d.high = +d.high;
        d.low = +d.low;
        d.close = +d.close;
        d.volume = +d.volume;
        // console.log(d);
      });
      dispatch(receiveApiDataSucess(data));
    });
  }
}
