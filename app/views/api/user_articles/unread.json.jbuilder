json.array! @unread do |unread|
  json.extract! unread, :article_id
end
