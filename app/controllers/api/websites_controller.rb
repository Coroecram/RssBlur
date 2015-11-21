require 'open-uri'
class Api::WebsitesController < ApplicationController

  before_action :require_signed_in

  def index
    render json: current_user.websites
  end

  def create
    begin
      page = MetaInspector.new(params[:url])
    rescue
    end
    feed = (page.content_type === "text/xml" ? true : false)
    debugger
    if (feed)
      #.meta contains so much information!
      # doc = Nokogiri::XML(open(feed.url))
      # title = doc.xpath("//title").children.first.text
      # @website = Website.create!({name: title, url: feed.url feed: feed})
      # UserWebsite.create!({user_id: current_user.id, website_id: website.id})
      # @website
    else
      render json: 'This address does not point to an RSS feed or a website with an RSS feed.',
                    status: :unprocessable_entity
    end
  end

  def show
    render json: Website.find(params[:id])
  end

  def destroy

  end

  private

  def website_params
    params.require(:website).permit(:url, :folder_id)
  end

end
