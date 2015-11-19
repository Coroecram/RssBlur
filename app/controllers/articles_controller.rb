require 'open-uri'
require 'rss'

# RSS::Parser.parse(open(feed.url))
# parsed.items[1].dc_creator = author
# parsed.items[1].description = summary
# parsed.items[1].title = title
# parsed.items[1].link = url
# parsed.items[1].pubDate = created_date
class ArticlesController < ApplicationController

  def index

  end
end
