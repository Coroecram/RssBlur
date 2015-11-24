require 'open-uri'

class Api::WebsitesController < ApplicationController

  before_action :require_signed_in

  def index
    render json: current_user.websites
  end

  def create
    url = params[:url]
    if url_validation
      feed = feed_validation
      page = MetaInspector.new(params[:url])
      url = page.url
      @website = Website.find_by_url(url)
      if @website
        UserWebsite.create({user_id: current_user.id, website_id: @website.id})
        return @website
      elsif feed
        root_uri = URI(params[:url])
        root_url = "#{root_uri.scheme}://#{root_uri.host}"
        root_page = MetaInspector.new(root_url)
        doc = Nokogiri::XML(open(url))
        name = "#{doc.xpath("//title").children.first.text} Feed"
        logo = root_page.images.favicon
        description = root_page.description
      else
        url = page.url
        name = page.title
        logo = page.images.favicon
        description = page.description
      end
        @website = Website.create!({name: name,
                                    url: url,
                                    description: description,
                                    logo: logo,
                                    is_feed: feed})
        UserWebsite.create!({user_id: current_user.id, website_id: @website.id})
        @website
    else
      return render json: 'This address does not point to a website or a website with an RSS feed.',
                    status: :unprocessable_entity
    end
  end

  def show
    render json: Website.find(params[:id])
  end

  def feed
    if url_validation
      page = MetaInspector.new(params[:url])
      if page.url == "http://www.thenation.com/"
        render json: {url: "http://www.thenation.com/feed/?post_type=article"}
      elsif page.feed
        url = page.feed
        return render json: {url: "url"}
      end
    else
      return render json: 'This address does not point to a website with an RSS feed.',
                    status: :unprocessable_entity
    end
  end

  private

  def website_params
    params.require(:website).permit(:url, :folder_id)
  end

  def url_validation
    !!URI.parse(params[:url])
  end

  def feed_validation
    begin
      page = MetaInspector.new(params[:url])
    rescue
    end
    return (page.content_type === "text/xml" ? true : false)
  end

end
