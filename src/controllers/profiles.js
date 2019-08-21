import Profile from '../models/Profile';
import User from '../models/User';
import validateProfileInput from '../validation/profile';
import validateExperienceInput from '../validation/experience';
import validateEducationInput from '../validation/education';
import errorMessages from '../error-handling/strings';

class ProfilesController {
  async getCurrentUsersProfile (req, res) {
    let errors = {};
  
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noProfile = errorMessages.profile_not_found_for_current_user;
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  };

  async getAllProfiles (req, res) {
    const errors = {};

    Profile.find()
      .populate('user', ['name', 'avatar'])
      .then(profiles => {
        if (!profiles) {
          errors.noProfiles = errorMessages.profiles_not_found;
          return res.status(404).json(errors);
        }
        res.json(profiles);
      })
      .catch(err => res.status(404).json({ profile: errorMessages.profiles_not_found }));
  };

  async getProfileByHandle (req, res) {
    const errors = {};

    Profile.findOne({ handle: req.params.handle })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noProfile = errorMessages.profile_not_found_for_handle;
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  };

  async getProfileByUserId (req, res) {
    const errors = {};

    Profile.findOne({ user: req.params.user_id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noProfile = errorMessages.profile_not_found_for_user_id;
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err =>
        res.status(404).json({ profile: errorMessages.profile_not_found_for_user_id })
      );
  };

  async setUserProfile (req, res) {
    const { errors, isValid } = validateProfileInput(req.body);
  
    // any validation erros are returned
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    // get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubUsername) profileFields.githubUsername = req.body.githubUsername;
  
    //skills needs to be an array, based on schema
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }
  
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //create
  
        // see if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = errorMessages.handle_already_exists;
            res.status(400).json(errors);
          }
  
          // do the save
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  };

  async addExperienceToProfile (req, res) {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
  
      profile.experience.unshift(newExp);
  
      profile.save().then(profile => res.json(profile));
    });
  };

  async deleteExperienceFromProfileById (req, res) {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
      // get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      // remove experience id out of the array
      profile.experience.splice(removeIndex, 1);

      // save the update
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.json(404).json(err));
  };

  async addEducationToProfile (req, res) {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  };

  async deleteEducationFromProfileById (req, res) {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
      // get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      // remove education id out of the array
      profile.education.splice(removeIndex, 1);

      // save the update
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.json(404).json(err));
  };

  async deleteAccountForUser (req, res) {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json({ success: true });
      });
    });
  };
};
export default new ProfilesController();