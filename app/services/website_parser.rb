require 'open-uri'
require 'metainspector'

class WebsiteParser
  attr_reader :website, :success

  def initialize(user_id, url)
    @user_id = user_id
    @url = url

    website_parse
  end

  def website_parse
    begin
      page = MetaInspector.new(@url)
    rescue
      page = false
    end
    if page
      feed = feed_validation(page)
      url = page.feed || page.url
      url = "http://www.thenation.com/feed/?post_type=article" if page.url == "http://www.thenation.com/"
      @website = Website.find_by_url(url)
      if @website
        UserWebsite.find_or_create_by(user_id: @user_id, website_id: @website.id)
        @success = true
        return
      elsif feed
        root_uri = URI(page.url)
        root_url = "#{root_uri.scheme}://#{root_uri.host}"
        root_page = MetaInspector.new(root_url)
        doc = Nokogiri::XML(open(root_url))
        begin
          name = "#{doc.xpath("//title").children.first.text[0..10]} Feed"
        rescue
          debugger
          name = "#{root_page.host[0..10]} Feed"
        end
        logo = root_page.images.favicon
        description = root_page.description
      else
        @success = false
        return
      end
      @website = Website.create!({name: name,
                                  url: url,
                                  description: description,
                                  logo: logo})
      UserWebsite.create!({user_id: @user_id, website_id: @website.id})
    else
      @success = false
    end
  end

  private

  def feed_validation(page)
    begin
      feed = MetaInspector.new(page.feed)
    rescue
      feed = page
    end
    return (feed.content_type === "text/xml" || "application/rss+xml" ? true : false)
  end

end
