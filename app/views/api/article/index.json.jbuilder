json.array! @articles do |article|
  # json.url article.url
  # json.title article.title
  # json.author article.author
  # json.summary article.summary
  # json.created_date article.created_date
  json.extract!(article, :url, :title, :author, :summary, :created_date)
end
