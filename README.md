# UTAK Menu CRUD - Test

​

## Overview

​
This CRUD (Create, Read, Update, Delete) application was developed using Vite + React for the frontend and Firebase for backend services. The application allows users to perform basic CRUD operations on menu items.
​

## Technologies Used

​

- **Vite + React**: Vite was used as the build tool and development server. It provided fast builds and hot module replacement during development.
- **Tailwind CSS**: Tailwind CSS was utilized for styling the UI components. Its utility-first approach allowed for rapid styling and customization.
- **Fuse.js**: Fuse.js was integrated into the application to implement client-side full-text search functionality. This allows users to efficiently search for menu items based on their name or category.
  ​

## Features

​

- **Basic CRUD Operations**: Users can create, read, update, and delete menu items.
- **Image Upload**: Although not originally required (based on instructions), the application includes a feature for uploading images for menu items using Firebase Storage. This adds visual appeal and enhances the user experience.
- **Full-text Search**: The application incorporates client/browser-side full-text search functionality using Fuse.js. This allows users to quickly search for menu items by name or description without reloading the page.
  ​
  ​
  CRUD App Documentation
  Overview
  This CRUD (Create, Read, Update, Delete) application was developed using Vite + React for the frontend and Firebase for backend services. The application allows users to perform basic CRUD operations on menu items.

Technologies Used
Vite + React: Vite was used as the build tool and development server. It provided fast builds and hot module replacement during development.
Tailwind CSS: Tailwind CSS was utilized for styling the UI components. Its utility-first approach allowed for rapid styling and customization.
Fuse.js: Fuse.js was integrated into the application to implement client-side full-text search functionality. This allows users to efficiently search for menu items based on their name or category.
Features
Basic CRUD Operations: Users can create, read, update, and delete menu items.
Image Upload: Although not originally required (based on instructions), the application includes a feature for uploading images for menu items using Firebase Storage. This adds visual appeal and enhances the user experience.
Full-text Search: The application incorporates client/browser-side full-text search functionality using Fuse.js. This allows users to quickly search for menu items by name or description without reloading the page.
Example

<link rel="stylesheet" href="editormd/css/editormd.css" />
<div id="test-editor">
    <textarea style="display:none;">### Editor.md

**Editor.md**: The open source embeddable online markdown editor, based on CodeMirror & jQuery & Marked.
</textarea>

</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="editormd/editormd.min.js"></script>
<script type="text/javascript">
    $(function() {
        var editor = editormd("test-editor", {
            // width  : "100%",
            // height : "100%",
            path   : "editormd/lib/"
        });
    });
</script>Copy
More Examples >>

Features
Support Standard Markdown / CommonMark and GFM(GitHub Flavored Markdown);
Full-featured: Real-time Preview, Image (cross-domain) upload, Preformatted text/Code blocks/Tables insert, Code fold, Search replace, Read only, Themes, Multi-languages, L18n, HTML entities, Code syntax highlighting...;
Markdown Extras : Support ToC (Table of Contents), Emoji, Task lists, @Links...;
Support TeX (LaTeX expressions, Based on KaTeX), Flowchart and Sequence Diagram of Markdown extended syntax;
Support identification, interpretation, fliter of the HTML tags;
Support AMD/CMD (Require.js & Sea.js) Module Loader, and Custom/define editor plugins;
Compatible with all major browsers (IE8+), compatible Zepto.js and iPad;
Support Custom theme styles;
Download & install
Latest version: v1.5.0，Update: 2015-06-09

Or NPM install:

npm install editor.md

Or Bower install:

bower install editor.md

Change logs:

CHANGES

Dependents
Projects :

CodeMirror
marked
jQuery
FontAwesome
github-markdown.css
KaTeX
Rephael.js
prettify.js
flowchart.js
sequence-diagram.js
Prefixes.scss

Development tools :

Visual Studio Code
Sass/Scss
Gulp.js
License
Editor.md follows the MIT License, Anyone can freely use.

Fork me on Github :

Users

Contact Us: editor.md@ipandao.com

Editor.md
Copyright © 2015-2019 Editor.md, MIT license.

Design & Develop By: Pandao
