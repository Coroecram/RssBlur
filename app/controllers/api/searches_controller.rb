class Api::SearchesController < ApplicationController

  def index
    debugger
    @search_results = PgSearch
      .multisearch(params[:query])
      .page(params[:page])
  end
end
