/*
 * createdAt: 2017-06-14
 * autor: @rolangom
 */

const Storage = require('@google-cloud/storage');
const formidable = require('formidable');
const util = require('util');

const storage = Storage();

const
  CLOUD_BUCKET = 'CLOUD_BUCKET',
  UPLOAD_PATH = 'foldername';

const bucket = storage.bucket(CLOUD_BUCKET);

function getPublicUrl (filename) {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${UPLOAD_PATH}/${filename}`;
}

function createFileInStorage(lfile) {
  const options = {
    destination: bucket.file(`${UPLOAD_PATH}/${lfile.name}`),
    public: true,
    resumable: false,
    metadata: {
      contentType: lfile.type,
    }
  };

  return new Promise((resolve, reject) => {
    bucket.upload(lfile.path, options, function (err, file, apiResponse) {
      console.log('bucket.upload response', err, file, apiResponse);
      if (err) {
        reject(err);
      } else {
        resolve(getPublicUrl(lfile.name));
      }
    });
  });
}

function upload(req, res) {
  if (req.method.toLowerCase() === 'post') {
    // parse a file upload
    const form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');

      const complete = (err, url) => res.end(util.inspect({fields: fields, files: files, err: err, url}));

      createFileInStorage(files.upload)
        .then((url) => complete(null, url))
        .catch((err) => complete(err));
    });

    return;
  }

  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<h2>Upload and text</h2>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
      '<input type="text" name="title"><br>'+
      '<input type="file" name="upload"><br>'+
      '<input type="submit" value="Upload">'+
    '</form>'
  );
}

module.exports.upload = upload;
