from flask import Flask,request
import json

#allow cors
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

def largest_id():
    articles_json = json.load(open('articles.json'))
    ids = [article['id'] for article in articles_json]
    if len(ids) == 0:
        return 0
    return max(ids)

@app.route('/api/articles')
def get_articles():
    articles_json = json.load(open('articles.json'))
    return json.dumps(articles_json)

@app.route('/api/articles/add')
def add_article():
    title = request.args.get('title')
    content = request.args.get('content')
    article_content = open(content,mode='r').read()
    articles_json = json.load(open('articles.json'))
    new_article = {'id':largest_id()+1, 'title':title, 'content':article_content}
    articles_json.append(new_article)
    json.dump(articles_json, open('articles.json', 'w'))
    return 'Article added successfully'

@app.route('/api/articles/delete')
def delete_article():
    article_id = request.args.get('id')
    articles_json = json.load(open('articles.json'))
    for article in articles_json:
        if str(article['id']) == article_id:
            articles_json.remove(article)
            json.dump(articles_json, open('articles.json', 'w'))
            return 'Article deleted successfully'
    return 'Article not found'

@app.route('/api/articles/<int:article_id>')
def get_article(article_id):
    articles_json = json.load(open('articles.json'))
    for article in articles_json:
        if article['id'] == article_id:
            return article
    return {'title':'Not Found','content':'Not Found'}

    
if __name__ == '__main__':
    app.run(debug=True,port=64012)
