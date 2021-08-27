import React, {Component} from 'react';
import {View, Text} from 'react-native';
import retrieveDataByKey from '../db/retrieveData';

class ListsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: null, // {data: ['defaultList', ...]
    };
  }

  async componentDidMount() {
    this.setState({
      lists: await retrieveDataByKey('@LISTS'),
    });
    console.log('Changed lists: ' + this.state.lists);
  }
  render() {
    let cards = null;
    console.log('***********************' + this.state.lists);
    if (this.state.lists && this.state.lists.data) {
      console.log(this.state.lists.data);
      cards = this.state.lists.data.map((element, i) => {
        return <Text key={i}>{element}</Text>;
      });
    }
    return <View>{cards != null ? cards : <Text>"Error"</Text>}</View>;
  }
}

export default ListsView;
