# frozen_string_literal: true

class FirstEditedArticleMailer < ApplicationMailer
  def self.send_email(alert)
    return unless Features.email?
    return if alert.course.instructors.pluck(:email).blank?
    email(alert).deliver_now
  end

  def email(alert)
    @alert = alert
    set_course_and_users
    params = { to: @instructors.pluck(:email),
               bcc: @alert.bcc_to_salesforce_email,
               subject: @alert.main_subject }
    params[:reply_to] = @alert.reply_to unless @alert.reply_to.nil?
    mail(params)
  end

  private

  def set_course_and_users
    @course = @alert.course
    @course_link = "https://#{ENV['dashboard_url']}/courses/#{@course.slug}"

    article_course_record = @course.articles_courses.first
    @example_article = article_course_record.article
    @example_editor = article_course_record.editors.first
    @students_link = "#{@course_link}/students"
    @student_details_link = "#{@students_link}/articles/#{@example_editor.username}"

    @instructors = @course.instructors
    # eg, "Full Name, User2, and Other Fullname"
    @greeted_users = @instructors.map { |user| user.real_name || user.username }.to_sentence
  end
end
