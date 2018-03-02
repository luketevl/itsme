import React, { Component } from 'react';
import classes from './Peoples.css';
import PeopleCard from './PeopleCard/PeopleCard';
import axios from '../../axios';
import firebase from '../../fire';
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

export default class Peoples extends Component{
  state ={
    peoples: [],
    error: false
  }

  checkAllUseds(users = []){
    return users.every(user => user.used !== 0)
  }

  setAllUsed(users, used= 0){
    return users.map(user => {
      this.updateFirebaseUsers(user.id, used)
      user.used = used;
      return user;
    }
    );
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
  componentWillMount () {
    axios.get( 'users.json' )
        .then( response => {
          let users = this.createData(response.data);
          if(this.checkAllUseds(users)){
            users = this.setAllUsed(users, 0);
          }
          this.setState( { peoples: users } );
        } )
        .catch( error => {
            this.setState( { error: true } );
        } );
}

updateFirebaseUsers(id, used){
  firebase.database().ref().child(`/users/${id}`).update({
    used: used
  })
}
handleItsMeOk = (id) => {
firebase.database().ref().child(`/users/${id}`).update({
  used: 1
}).then(response => {
  debugger;
  let index =null;
  this.state.peoples.forEach((item, idx) => item.id === id ? index = idx: null);
  let peoplesUpdated = [...this.state.peoples];
  peoplesUpdated[index] = {
    ...peoplesUpdated[index],
    used: 1
  } 

  if(this.checkAllUseds(peoplesUpdated)){
    peoplesUpdated = this.setAllUsed(peoplesUpdated, 0);
  }
  this.setState({peoples: peoplesUpdated});
}).catch(err => {
  this.setState({ eror: true})
  })

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
