import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import UpcomingExercise from '../components/UpcomingExercise.jsx';
import Header from '../components/Header.jsx';

export class MyExercisesContainer extends React.Component {
  _categorize(kind, trainings) {
    return trainings.reduce((acc, training) => {
      if (training.kind !== kind) return acc;

      const isComplete = training.deadline_status === 'complete';
      const flags = training.flags || {};
      if (isComplete && flags.marked_complete) {
        acc.complete.push(training);
      } else if (isComplete) {
        acc.incomplete.push(training);
      } else {
        acc.unread.push(training);
      }

      return acc;
    }, { complete: [], incomplete: [], unread: [] });
  }

  render() {
    const { course, kind, trainingStatus, trainingLibrarySlug, user } = this.props;
    if (!trainingStatus[user.id]) return null;
    const modules = this._categorize(kind, trainingStatus[user.id]);
    const incomplete = modules.incomplete.concat(modules.unread);

    if (!incomplete.length) return null;
    if (modules.loading) {
      return (
        <div className="module my-exercises">
          <h3>Loading...</h3>
        </div>
      );
    }

    const [latest, ...remaining] = [...incomplete].sort((a, b) => {
      if (a.block_id === b.block_id) { return 0; }
      return a.block_id > b.block_id ? 1 : -1;
    });
    if (!latest) {
      return (
        <div className="module my-exercises">
          <Header completed={true} course={course} text="Completed all exercises" />
        </div>
      );
    }

    return (
      <div className="module my-exercises">
        <Header course={course} remaining={remaining} text="Upcoming Exercises" />
        <UpcomingExercise exercise={latest} trainingLibrarySlug={trainingLibrarySlug} />
      </div>
    );
  }
}

MyExercisesContainer.propTypes = {
  course: PropTypes.object.isRequired,
  trainingLibrarySlug: PropTypes.string.isRequired
};

const mapStateToProps = ({ course, trainingStatus }) => ({ course, trainingStatus });
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(MyExercisesContainer);
