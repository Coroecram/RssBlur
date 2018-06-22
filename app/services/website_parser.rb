require 'rss'
require 'open-uri'

class WebsiteParser
  attr_reader :website, :success

  def initialize(user_id, url)
    @user_id = user_id
    @url = url

    website_parse
  end

  def website_parse
    feed = nil
    @website = Website.find_by_url(@url)
    if @website
      UserWebsite.find_or_create_by(user_id: @user_id, website_id: @website.id)
      @success = true
      return
    else
      begin
        open(@url) do |rss|
          feed = RSS::Parser.parse(rss)
        end
        name = feed.channel.title
        description = feed.channel.description
        root_uri = URI(feed.channel.link)
        root_url = "#{root_uri.scheme}://#{root_uri.host}"
        root_page = MetaInspector.new(root_url, :allow_non_html_content => true, download_images: false)
        logo = root_page.images.favicon
        @website = Website.create!({name: name,
                                    url: @url,
                                    description: description,
                                    logo: logo})
        UserWebsite.create!({user_id: @user_id, website_id: @website.id})
        @success = true;
      rescue Exception => e
        puts e.message
        @success = false
      end
    end
  end
end
