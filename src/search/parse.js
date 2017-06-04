const fs = require('fs');
const glob = require('glob');
const cheerio = require('cheerio');
const uuid = require('uuid');
const websiteUrl = 'https://signo.mathieudelvaux.be';
const index = [];
const getDirectories = (src, callback) => {
  glob(`${src}/**/*.html`, callback);
};

getDirectories('../../build', (err, res) => {
  if (err) {
    console.log('Error', err);
  } else {
    res.shift();
    parse(res);
  }
});

function parse(files) {
  for (let i = 0; i < files.length; i++) {
    const $ = cheerio.load(fs.readFileSync(files[i]));
    const id = uuid.v4();
    let title = $('head title').text().split(' |')[0];
    title = title.split(' – signo')[0];
    title = title.split(' - ')[0];
    const description = $('meta[name="description"]').attr('content');
    const dir = 'build';
    const relDir = files[i].slice(files[i].indexOf(dir) + dir.length).split('/');
    const urlPath = relDir.slice(0, relDir.length - 1).join('/');
    const keywords = urlPath.substring(1).split('/');
    const category = keywords[0];
    let body = '';

    if ((category === 'design' || category === 'develop') && keywords.length >= 2) {
      // body = $('.doc__article').html();
      $('.doc__article').children().each(function(i, elem) {
        body += `${$(this).text()} `;
        $(this).children().each(function(i, elem) {
          body += `${$(this).text()} `;
          $(this).children().each(function(i, elem) {
            body += `${$(this).text()} `;
          });
        });
      });
    } else {
      // body = $('.article__content').html();
      $('.article__content').children().each(function(i, elem) {
        body += `${$(this).text()} `;
        $(this).children().each(function(i, elem) {
          body += `${$(this).text()} `;
          $(this).children().each(function(i, elem) {
            body += `${$(this).text()} `;
          });
        });
      });
    }

    body = body.replace(/(\n)/gm, ' ');
    body = body.replace(/ +(?= )/g, '');
    body = body.trim();

    const obj = {
      id: id,
      title: title,
      description: description,
      link: `${websiteUrl}${urlPath}`,
      category: category,
      keywords: keywords,
      content: body
    };

    if (category === 'design' || category === 'develop' || category === 'tools' || category === 'learn' || category === 'contribute') {
      index.push(obj);
    }

    // console.log(JSON.stringify(obj));
  }
  console.log(index);

  createFile();
}


function createFile() {
  fs.writeFile('data.json', JSON.stringify(index, null, 2), 'utf8', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('The file was saved!');
    }
  });
}
