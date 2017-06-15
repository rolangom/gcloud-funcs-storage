# gcloud-funcs-storage
[Google Cloud Functions](https://cloud.google.com/functions/) example showing how to upload file using [node-formidable](https://github.com/felixge/node-formidable) into Google [Cloude Storage](https://cloud.google.com/storage/).

1. Install the [gcloud tool](https://cloud.google.com/sdk/downloads)
2. Create a project in Google Cloud Platform
3. Enable Google Cloud Storage and Functions
4. Create a bucket or use an existing one
5. Clone this project or take the code you need
5. Install dependencies

    npm install

6. Deploy to Google Cloud Functions:

    gcloud beta functions deploy upload --stage-bucket [CLOUD-BUCKET-NAME] --trigger-http

