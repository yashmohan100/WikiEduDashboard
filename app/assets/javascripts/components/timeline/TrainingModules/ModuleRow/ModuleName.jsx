import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export const ModuleName = ({ due_date, isExercise, module_name }) => {
  const moduleName = module_name || name;
  const date = due_date ? due_date.replace(/\//g, '-') : null;
  const dueDate = moment(date).format('MMM Do');
  return (
    <td className="block__training-modules-table__module-name">
      {moduleName}
      {
        isExercise
          ? <small className="due-date">Due on {dueDate}</small>
          : null
      }
    </td>
  );
};

ModuleName.propTypes = {
  due_date: PropTypes.string.isRequired,
  isExercise: PropTypes.bool.isRequired,
  module_name: PropTypes.string.isRequired
};

export default ModuleName;
