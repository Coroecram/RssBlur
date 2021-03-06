class Api::WebsitesController < ApplicationController

  before_action :require_signed_in

  def index
    render json: current_user.websites
  end

  def create
    parsed = WebsiteParser.new(current_user.id, params[:url])
    if parsed.success
      @website = parsed.website
    else
      return render json: 'This address does not point to a website with a valid RSS feed.',
                    status: :unprocessable_entity
    end
  end

  def show
    @website = current_user.websites.find(params[:id].to_i)
    @website || "all"
  end

end
