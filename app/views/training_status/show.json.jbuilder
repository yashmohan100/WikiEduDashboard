# frozen_string_literal: true

json.course do
  json.training_modules @assigned_training_modules do |training_module|
    json.call(training_module, :id, :slug, :kind)
    json.module_name training_module.name

    training_progress_manager = TrainingProgressManager.new(@user, training_module)
    json.status training_progress_manager.status
    json.completion_date training_progress_manager.completion_date

    due_date_manager = TrainingModuleDueDateManager.new(
      course: @course,
      training_module: training_module,
      user: current_user
    )
    json.module_progress due_date_manager.module_progress
    json.due_date due_date_manager.computed_due_date.strftime('%Y/%m/%d')
    json.overdue due_date_manager.overdue?
    json.deadline_status due_date_manager.deadline_status
    json.flags due_date_manager.flags
  end
end
