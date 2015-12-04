json.array! unreads do |unread|
  json.extract! unread, :article_id
end
