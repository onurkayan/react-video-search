import _ from 'lodash';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'

const API_KEY = 'AIzaSyCxX2gVM42Zc5GzHWIG9jhsQrmHAPlQlF8';



class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      videos:[],
      selectedVideo:null
    };

    this.videoSeach('serverless');

  }

  videoSeach(term){
    YTSearch({key:API_KEY,term:term},(videos) => {
      this.setState(
        { videos  ,
          selectedVideo : videos[0]
        }
      )
    });
  }

  render() {
    const videoSeach = _.debounce((term) => {this.videoSeach(term)},300);

    return (<div>
      <SearchBar onTermChange = { videoSeach }/>
      <VideoDetail video = {this.state.selectedVideo}/>
      <VideoList
          onVideoSelect = { selectedVideo => this.setState({selectedVideo})}
          videos = {this.state.videos}/>
    </div>);
  }
}

ReactDOM.render(<App />,document.querySelector('.container'));
ReactDOM.render(<App />,document.querySelector('.container'));
