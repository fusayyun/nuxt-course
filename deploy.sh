#!/usr/bin/env sh

# 當發生錯誤時終止腳本運行
set -e

# 打包
npm run generate

# 移動至到打包後的dist目錄 
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
#因為dist資料夾預設是被ignore的，因此在進入dist資料夾後初始化git
git init 
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
# 部署到 git@github.com:fusayyun/BookList.git 分支為 gh-pages
#將dist資料夾中的內容推送至遠端BookList的gh-pages分支中，並強制無條件將舊有的內容取代成目前的內容（指令 git push -f)
git push -f https://github.com/fusayyun/nuxt-course.git master:gh-pages
cd -