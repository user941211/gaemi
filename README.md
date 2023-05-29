package.json 실험
"start": "concurrently \"node server.js\" \"react-scripts start\" ",
"proxy" : "http://localhost:3001",

작성 이유는 현재는 node server.js가 있어야지만 실행이 가능하다. db 서버가 만들어지고 접속이 가능한지 알기 위해 실험용으로 남긴다.