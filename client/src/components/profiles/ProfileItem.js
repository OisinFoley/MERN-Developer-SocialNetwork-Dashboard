import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import PropTypes from 'prop-types';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <span className="col-12">
            <img src={profile.user.avatar} alt="" className="img rounded-circle col-2 img--alt-font" />
            <div id="profile-short-details-text">
              <p id="users-profile-name">{profile.user.name}</p>
              <p className='profileCurrentPosition'>
                  {profile.status}{' '}
                  {isEmpty(profile.company) ? null : (
                    <span> at {profile.company} </span>
                  )}
              </p>
              <p className='profileLocation'>
                {isEmpty(profile.location) ? null : (
                  <span>{profile.location}</span>
                )}
              </p>
            </div>
          </span>
          
          <h4 className='headingSkillSet text-center' style={{width: 100 + "%"}}>Skill set</h4>
          <div className="col-10 offset-1" id="profile-item-skillset">
            <ul className="list-group">
              {profile.skills.slice(0, 6).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" /> {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <span className='posts-profiles-feed__feed-item-link-span'>
          <Link to={`/profile/${profile.handle}`} className="btn btn-info post-feed--comments-link-button__width">
            View Full Profile
          </Link>
        </span>
      </div>
    );
  }
}

ProfileItem.proptypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
