# StartedKit
Started kit with default web-app structure, LESS, Gulp and Bower.

##How to start?
1. Clone or download this kit on you project folder
2. Init new git repository <code>git init</code>
3. Refactor for yourself <code>package.json, bower.json, README.md</code> files (look at comments).
4. Next <code>npm install</code> for install all plugins (see package.json)
6. Refactor for yourself  <code>.bowerrc</code>. By default path to libraries looks like that:
   <code>
   {  
      "directory" : "app/libs/"
   }
   </code>
7. Take you necessary libraries with <code>bower install lib-name --save</code>
8. Start code

###Gulp plugins:
  * gulp-less
  * gulp-autoprefixer
  * browser-sync
  * gulp-concat
  * gulp-uglifyjs
  * gulp-cssnano
  * gulp-rename
  * del
  * gulp-imagemin
  * imagemin-pngquant
  * gulp-cache
  * gulp-util
  * gulp-ftp
