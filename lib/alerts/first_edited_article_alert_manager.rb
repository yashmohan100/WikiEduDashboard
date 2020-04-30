# frozen_string_literal: true

class FirstEditedArticleAlertManager
  def initialize(courses)
    @courses = courses
  end

  # Only create alerts for new courses after
  # this feature launched, so that the alert
  # is timely.
  START_DATE_CUTOFF = '2020-05-01'.to_date

  def create_alerts
    @courses.each do |course|
      next if course.start < START_DATE_CUTOFF
      next unless active_in_mainspace?(course)
      next if Alert.exists?(course_id: course.id, type: 'FirstEditedArticleAlert')
      alert = Alert.create(type: 'FirstEditedArticleAlert', course_id: course.id)
      alert.send_email # email course instructors
    end
  end

  private

  def active_in_mainspace?(course)
    course.character_sum.positive?
  end
end
