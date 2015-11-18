require 'open-uri'
class Api::WebsitesController < ApplicationController

  before_action :require_signed_in

  def index
    render json: current_user.websites
  end

  def create
    page = MetaInspector.new(params[:url])
    feed = false
    feed = MetaInspector.new(page.feed) if page.feed
    if (feed)
      doc = Nokogiri::XML(open(feed.url))
      title = doc.xpath("//title").children.first.text
      website = Website.create!({name: title, url: feed.url })
      UserWebsite.create!({user_id: current_user.id, website_id: website.id})
      render json: website
    else
      render json: 'This address does not point to an RSS feed or a website with an RSS feed.',
                    status: :unprocessable_entity
    end
  end

  def destroy

  end

  private

  def website_params
    params.require(:website).permit(:url, :folder_id)
  end

end
