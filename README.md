# happy-steam-scraper

*~~hacky~~ happy Steam scraper* is a simple Node.js/IO.js module for scraping
profile information from public Steam profiles.

## Install

```bash
$ npm install --save happy-steam-scraper
```


## Usage

```js
var happySteam = require('happy-steam-scraper');

happySteam.gamesFromProfile('some-example-profile',function (err,data)
{
    if (!err)
    {
        console.log(data);
            // [ { appid: 238960,
            //  name: 'Path of Exile',
            //  logo: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/238960/9027c524c8d4d5f59f309c4f84a7f8f6e1ac832b.jpg',
            //  friendly_name: 'PathofExile',
            //  availStatLinks:
            //   { achievements: true,
            //     global_achievements: true,
            //     stats: false,
            //     leaderboards: false,
            //     global_leaderboards: false },
            //  friendlyURL: 'PathofExile',
            //  hours: '0',
            //  hours_forever: '0',
            //  last_played: 0 } ]
    }
    else
    {
        console.log(err);
    }
});

```

## API

## .gamesFromProfile(profileName, callback)

### profileName

*Required*
Type: `string`

The name of the profile to download information from, or the ID for the
profile. Can be found in the URL to the profile on steamcommunity:
*http://steamcommunity.com/id/[profileName]/games/*.

### callback(err, data)

*Required*
Type: `function`

#### err

The error that occurred, or null if no error occurred.

#### data

An array of javascript objects containing the data from Steam, or null if an
error occurred. See also «Forward API compatibility».

## Forward API compatibility

The data returned is currently the raw data extracted from the datastructure on
Steam. This means that the data can change if the data from Steam changes.
This module makes the following guarantees about the returned data (and will in
the future make changes to the returned datastructure to ensure compatibility
if needed):

* It will always be an array of objects
* The object will always have the keys *name* and *appid* (as long as that
  data is somehow provided by Steam)

# License

## Data
This library is not affiliated with Valve, Steam, or any of their partners. All
copyrights reserved to their respective owners, specifically the data returned
is Copyright (C) Valve Corporation, see http://steamcommunity.com/.

## Source code

This library is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this library.  If not, see <http://www.gnu.org/licenses/>.
