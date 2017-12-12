import React from 'react'
import { Link, Redirect } from 'react-router-dom';

export const CourseElement = ({elem, user, onClick}) =>
  <li>
    <h3><strong>Titre : </strong>{elem.title}</h3>
    <h5><strong>description : </strong>{elem.description}</h5>
    <p><strong>contenu : </strong>{elem.content}</p>
    <p><strong>Professeur : </strong>{elem.ownerUsername}</p>
    <Link to={`/course/${elem._id}`}>Aller voir le cours</Link>
    {
      elem.owner == user._id ?
      <button onClick={onClick}>Remove</button> :
      ''
    }
  </li>
