# frozen_string_literal: true

# Controller for data on which trainings a user has completed
class TrainingStatusController < ApplicationController
  def show
    @course = Course.find_by(slug: params[:course_slug])
    @assigned_training_modules = @course.training_modules
    @user = User.find_by(id: params[:user_id])
  end

  def complete
    @user = current_user
    @course = Course.find(params[:course_id])
    @training_module = TrainingModule.find_by(slug: params[:module_id])
    @training_module_user = TrainingModulesUsers.create_or_find_by(
      user: @user,
      training_module_id: @training_module.id
    )

    mark_completion_status(params[:complete])    
    @assigned_training_modules = @course.training_modules    
    render 'training_status/show'
  end

  def user
    @user = User.find_by(username: params[:username])
  end

  private

  def mark_completion_status(value)
    @training_module_user.mark_completion(value)
    @training_module_user.save
  end
end
