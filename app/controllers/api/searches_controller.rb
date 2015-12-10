class Api::SearchesController < ApplicationController

  def index
    search_results = PgSearch
      .multisearch(params[:query])
      .includes(:searchable)
      .page(params[:page])
    @search_results = search_results.map(&:searchable)
    debugger
    render json: @search_results
  end
end
