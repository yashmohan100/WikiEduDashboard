# frozen_string_literal: true

class FirstEditedArticleMailerPreview < ActionMailer::Preview
  def message_to_instructors
    FirstEditedArticleMailer.email(alert)
  end

  private

  def alert
    ac = ArticlesCourses.where.not(user_ids: nil).first
    FirstEditedArticleAlert.new(course: ac.course)
  end
end
