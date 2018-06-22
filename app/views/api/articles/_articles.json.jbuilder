json.array! @articles do |article|
  json.extract! article, :id, :url, :title, :author, :summary, :created_date
end
