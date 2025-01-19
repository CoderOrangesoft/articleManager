let Server = {
    "host": "http://localhost:64012/"
}

let page = {
    "blog_url": "./"
}

function start_index() {
    console.log("Common script [2025]");
    showArticle();
}

function getArticleList() {
    return fetch(Server.host + "api/articles").then(response => response.json());
}
/*
    example return:
    [
        {
            "id":1,
            "title":"Article 1",
            "content_simple":"Today I will tell you something about my blo......"
        },
        {
            "id":2,
            "title":"Article 2",
            "content_simple":"I am a programmer and I love coding. I......."
        },
        {
            "id":3,
            "title":"Article 3",
            "content_simple":"I am a student and I love learning new things...."
        }
    ]
*/

function getArticle(id) {
    return fetch(Server.host + "api/articles/" + id).then(response => response.json());
}
/*
    example return:
    {
        "id":1
        "title":"Article 1",
        "content":"<p>Today I will tell you something about my blog.My blog is a place where I can write about my programming journey, my hobbies, and my thoughts on various topics.</p>"
    }
*/

function showArticle() {
    let article_list = getArticleList();
    article_list.then(
        result => {
            console.log('article_list', result)
            let article_box = document.getElementsByClassName("article_box")[0];
            for (let i = result.length - 1; i >= 0; i--) {
                let article = result[i];
                let article_html = `
                    <div class="article_item">
                        <h2>#${article.id}  ${article.title}</h2>
                        <p>${article.content}</p>
                        <button onclick="enterArticle(${article.id})">浏览</button>
                    </div>
                `;
                article_box.innerHTML += article_html;
            }
        }
    );
}

function enterArticle(id) {
    document.location.href = page.blog_url + 'article.html?id=' + id;
}

function start_article(id) {
    let article = getArticle(id);
    article.then(
        result => {
            console.log('article', article)
            if (result.title == 'Not Found') {
                let article = document.getElementsByClassName('article_box')[0];
                let article_html = `
                    编号为 ${id} 的文章不存在或已删除。
                `;
                article.innerHTML += article_html;
            } else {
                let article_box = document.getElementsByClassName("article_box")[0];
                let article_html = `
                <div class="article_item">
                    <h1>#${result.id}  文章标题：${result.title}</h1>
                    <p>${result.content}</p>
                </div>
            `;
                article_box.innerHTML = article_html;
            }
        }
    );
}
