var http =require('http')
var fs =require('fs')
var template =require('art-template')
var server =http.createServer()
var url =require('url')
var comments = [
    {
        name: '张三',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三2',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三3',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三4',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三5',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    }
]
server.on('request',function (request,response) {
    // console.log('haha')
    var parseObj = url.parse(request.url,true)
    // console.log(parseObj)
    var pathname = parseObj.pathname
    // console.log(url)
    if (pathname === '/') {
        fs.readFile('./view/index.html',function (err,data) {
            // console.log(data.toString())
            if (err) {
                return response.end('not found')
            }
            var htmlStr = template.render(data.toString(), {
                comments: comments
            })
            response.end(htmlStr)
        })
    }else  if (pathname.indexOf('/public/') === 0) {
         fs.readFile('.'+pathname,function (err,data) {
             if (err) {
                 return response.end('not found')
             }
             // console.log(data)
             response.end(data)
         })
    }else if (pathname === '/post') {
        fs.readFile('./view/post.html',function (err,data) {
            if (err) {
                return response.end('文件读取失败')
            }
            response.end(data)
        })
    }else if (pathname === '/pinglun') {
        var query =parseObj.query
        query.dateTime = '2019.1.30'
        comments.unshift(query)
        response.statusCode = 302
        response.setHeader('Location','/')
        response.end()
    }
    else {
        fs.readFile('./view/404.html',function (err,data) {
            if (err) {
                return response.end('not found')
            }
            response.end(data)
        })
    }
})
server.listen(5000,function () {
    console.log('runing')
})