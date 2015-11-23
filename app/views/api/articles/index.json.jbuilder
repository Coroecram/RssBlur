json.array! @articles do |article|
  json.extract! article, :url, :title, :author, :image, :summary, :created_date
end
