# Phase 3: Articles and UserArticles (2 days)

## Rails
### Models
* Article
* UserArticle

### Controllers
* Api::ArticlesController (create, index, delete, show, update)
* Api::UserArticlesController (create, index, delete, update)

### Views
* /websites/:id

## React/Flux

### Components
* ArticleList
* ArticleListItem
* ArticleDetail
* ArticleDetailItem

### Stores
* ArticlesStore

### Actions
* ArticleApiActions.fetchArticles
* ArticleApiActions.resetArticles

### ApiUtil
* ArticleApiUtil.fetchArticles
* ArticleApiUtil.deleteUserArticles
