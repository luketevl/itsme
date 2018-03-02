import React from 'react';
import classes from './PeopleCard.css';
const PeopleCard = props => {
  const styled = [classes.PeopleCard, props.used ? classes.Used : null]
  return(
  <div className={styled.join(' ')} onClick={() => props.clicked(props.id)}>
    <img src={props.avatar} className={classes.Avatar} alt={props.name} />
    <h1 className={classes.Title}>{props.name}</h1>
  </div>
)};

export default PeopleCard;