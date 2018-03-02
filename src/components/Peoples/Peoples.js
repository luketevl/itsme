import React, { Component } from 'react';
import classes from './Peoples.css';
import PeopleCard from './PeopleCard/PeopleCard';
import axios from '../../axios';
export default class Peoples extends Component{
  state ={
    peoples: [],
    error: false
  }

  createData(data){
    let users =[];
    for(let key in data){
      users.push({
        ...data[key],
        id: key
      })
    }
    return users;
  }
  componentDidMount () {

    
    console.log(this.props);
    axios.get( 'users.json' )
        .then( response => {
          console.log(response);
          const users = this.createData(response.data);
          console.log(users);
            this.setState( { peoples: users } );
        } )
        .catch( error => {
          console.log(error);
            this.setState( { error: true } );
        } );
}


handleItsMeOk = (id) => {
  // const order = 
  //   {
  //   name: 'Lukete',
  //   used: 0,
  //   avatar: 'https://i.imgur.com/Qn3RSuO.jpg'      
  // }
  // {
  //   name: 'Mano',
  //   used: 0,
  //   avatar: 'https://i.imgur.com/Sec1CUg.jpg'      
  // }
  // {
  //   name: 'Felipão',
  //   used: 0,
  //   avatar: 'https://i.imgur.com/kqBrMgp.jpg'      
  // }
  // {
  //   name: 'Everton',
  //   used: 0,
  //   avatar: 'https://i.imgur.com/QGUiDBw.jpg'      
  // }
// ]
  axios.patch(`/users/${id}.json`, {used:1})
    .then(response => {
      let index =null;
      this.state.peoples.forEach((item, idx) => item.id === id ? index : null);
      const peoplesUpdated = [...this.state.peoples];
      peoplesUpdated[index] = {
        ...peoplesUpdated[index],
        used: 1
      } 
      console.log(1111,peoplesUpdated);
      this.setState({peoples: peoplesUpdated});
    }).catch(err => {
      this.setState({ eror: true})
        console.log(err)
      }
    );

}

  render(){
    return (
      <div className={classes.Peoples}>
      {this.state.peoples.map(people => (
        <PeopleCard {...people} key={people.id} clicked={this.handleItsMeOk} />

      ))}
      </div>
    )
    
  }
}
