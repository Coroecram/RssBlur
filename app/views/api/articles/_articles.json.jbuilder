json.array! @articles do |article|
  json.extract! article, :id, :url, :title, :author, :image, :summary, :created_date
end
