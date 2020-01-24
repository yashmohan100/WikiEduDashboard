import React from 'react';
import PropTypes from 'prop-types';

export const ExerciseButton = ({
  course, currentUser, flags, isComplete, isExercise, moduleSlug,
  complete, fetchExercises, incomplete
}) => {
  let button = (
    <button className="button small left dark" disabled>
      Mark Complete
    </button>
  );

  if (isComplete && isExercise) {
    if (flags.marked_complete) {
      const onClick = () => incomplete(course.id, moduleSlug, currentUser.id).then(() => fetchExercises(course.id));
      button = (
        <button className="button small left" onClick={onClick}>
          Mark Incomplete
        </button>
      );
    } else {
      const onClick = () => complete(course.id, moduleSlug, currentUser.id).then(() => fetchExercises(course.id));
      button = (
        <button className="button small left dark" onClick={onClick}>
          Mark Complete
        </button>
      );
    }
  }

  return button;
};

ExerciseButton.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired
  }).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired
  }).isRequired,
  flags: PropTypes.shape({
    marked_complete: PropTypes.bool
  }),
  isComplete: PropTypes.bool.isRequired,
  isExercise: PropTypes.bool.isRequired,
  moduleSlug: PropTypes.string.isRequired,

  complete: PropTypes.func.isRequired,
  incomplete: PropTypes.func.isRequired,
};

export default ExerciseButton;
