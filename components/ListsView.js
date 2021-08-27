import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
    if (this.state.lists && this.state.lists.data) {
      console.log(this.state.lists.data);
      cards = this.state.lists.data.map((element, i) => {
        return <Text key={i} style={styles.listView}>{element}</Text>;
      });
    }
    return <View style={styles.container}>{cards != null ? cards : <Text>"Error"</Text>}</View>;
  }
}

const styles = StyleSheet.create({
    listView: {
        backgroundColor: 'powderblue',
        color: 'white',
        height: 150,
        flex: 0.5,
        margin: 20,
        textAlign:'center',
        textAlignVertical: 'center',
        borderRadius: 20,
        fontSize: 20,
    },
    container: {
        flexDirection:'row',
    }
});

export default ListsView;
