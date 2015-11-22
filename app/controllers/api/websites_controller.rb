require 'open-uri'

class Api::WebsitesController < ApplicationController

  before_action :require_signed_in

  def index
    render json: current_user.websites
  end

  def create
      # debugger
    url = params[:url]
    if url_validation
      feed = feed_validation
      if feed
        url = "http://#{url}" if url !=~ /http?:\/\/[\S]+/
        debugger
        # doc = Nokogiri::XML(open("params[:url]))
        # title = doc.xpath("//title").children.first.text
        # @website = Website.create!({name: title, url: feed.url, feed: feed})
        # UserWebsite.create!({user_id: current_user.id, website_id: website.id})
        # @website

      end
      debugger
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
      if page.feed
        metafeed = MetaInspector.new(page.feed)
        feed_uri = URI(metafeed.feed)
        return render json: {url: "#{feed_uri.scheme}://#{feed_uri.host}#{feed_uri.path}"}
      else
        return render json: 'This address does not point to a website with an RSS feed.',
                      status: :unprocessable_entity
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
    url_validator = Website.new(name: 'Test', url: params[:url])
    return url_validator.valid?
  end

  def feed_validation
    begin
      page = MetaInspector.new(params[:url])
    rescue
    end
    return (page.content_type === "text/xml" ? true : false)
  end

end
