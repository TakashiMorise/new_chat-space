json.array! @another_messages do |message|
  json.content message.content
  json.image message.image.url
  json.created_at message.created_at.strftime("%Y/%m/%d %H:%M")
  json.name message.user.name
  json.message_id message.id
end
