# csn-tool

Critical Sites Network Tool 2.0

## Install

Requirements:

* NodeJs 5.2+ [How to install](https://nodejs.org/download/)
* Heroku toolbet [How to install](https://toolbelt.heroku.com)

To install run this command:

```bash
npm install
```

## Usage

Run server locally usgin npm:

```bash
npm start
```

Run server locally using Heroku environment:

```bash
heroku local web
```

### Deploy

Configure existing heroku app:

```bash
heroku git:remote -a project
```

Run this command to publish master branch to Heroku:

```bash
git push heroku master
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request :D


## LICENSE

[MIT](LICENSE)
