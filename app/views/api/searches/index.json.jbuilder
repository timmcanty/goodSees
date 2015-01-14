json._page @search_results.current_page
json._total_pages @search_results.total_pages

json.results @search_results.map(&:searchable) do |model|
  # json.partial! model
  if model.class == User
    json.partial! "api/users/show", user: model
  else
    json.partial! "api/films/show", film: model
  end
end
