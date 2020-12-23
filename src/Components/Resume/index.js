import React from 'react';
import './Resume.css';
import Flavor from './Flavor';

const Resume = (props) => {
  const { Eng } = Flavor;
  const { summary } = Eng;
  const { skills } = Eng;
  const { workExp } = Eng;
  const { education } = Eng;

  return (
    <div className="card">
      <div className="block">
        <a className="tag">{summary.subject}:</a>
        <div>{summary.body}</div>
      </div>
      <div className="block">
        <a className="tag">{skills.subject}:</a>
        <div>{skills.body}</div>
      </div>
      <div className="block">
        <a className="tag">{workExp.subject}:</a>
        <div>{workExp.body}</div>
      </div>
      <div className="block">
        <a className="tag">{education.subject}:</a>
        <div>{education.body}</div>
      </div>
    </div>
  );
};

export default Resume;
