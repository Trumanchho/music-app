import { EnvironmentPlugin } from 'webpack';
import { config } from 'dotenv';

config();

module.exports = {
  plugins: [
    new EnvironmentPlugin([
      'APIKEY',
      'AUTHDOMAIN',
      'DATABASEURL',
      'PROJECTID',
      'STORAGEBUCKET',
      'MESSAGINGSENDERID',
      'APPID',
      'CLIENTID',
      'CLIENTSECRET',
      'REFRESHTOKEN',
    ])
  ]
}